"""Manual macOS/Xcode reference capture; no remote desktop or Apple login."""
import json
import os
from pathlib import Path
import platform
import subprocess
import threading
import time
import hashlib

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "artifacts/ios-reference"


def run(*args, **kwargs):
    return subprocess.run(args, check=True, text=True, **kwargs)


def main():
    if platform.system() != "Darwin":
        raise SystemExit("Ce script nécessite macOS et Xcode ; il ne lance rien sous Windows.")
    OUT.mkdir(parents=True, exist_ok=True)
    result = run("xcrun", "simctl", "list", "--json", capture_output=True)
    inventory = json.loads(result.stdout)
    (OUT / "inventory.json").write_text(result.stdout)
    requested = os.environ.get("IOS_MAJOR", "27")
    exact = os.environ.get("IOS_VERSION", "27.1").strip()
    runtimes = [r for r in inventory["runtimes"] if r.get("isAvailable")
                and r["identifier"].startswith("com.apple.CoreSimulator.SimRuntime.iOS-")
                and (requested == "auto" or r["version"].split(".")[0] == requested)
                and (not exact or r["version"] == exact)]
    if not runtimes:
        raise SystemExit(f"Aucun runtime iOS {requested} installé. Voir inventory.json. Aucun téléchargement automatique.")
    runtime = max(runtimes, key=lambda r: tuple(int(n) for n in r["version"].split(".")))
    types = [d for d in inventory["devicetypes"] if d["name"].startswith("iPhone")]
    model_name = os.environ.get("IOS_MODEL", "iPhone 17 Pro Max")
    model = next((d for d in types if d["name"] == model_name), None)
    if model is None:
        raise SystemExit(f"Le modèle demandé {model_name} est absent du runner.")
    run("ruby", "-rxcodeproj", "-e", "puts 'xcodeproj disponible'")
    device = run("xcrun", "simctl", "create", "Settings Reference", model["identifier"], runtime["identifier"], capture_output=True).stdout.strip()
    (OUT / "selection.json").write_text(json.dumps({"runtime": runtime, "deviceType": model, "udid": device}, indent=2))
    stop_capture = threading.Event()
    def capture_frames():
        frames=OUT / "frames"
        frames.mkdir(exist_ok=True)
        previous=None
        for index in range(120):
            if stop_capture.wait(8): break
            shot=frames / "current.png"
            try:
                result=subprocess.run(["xcrun","simctl","io",device,"screenshot",str(shot)],capture_output=True,timeout=12)
                if result.returncode==0:
                    digest=hashlib.sha256(shot.read_bytes()).hexdigest()
                    if digest!=previous:
                        shot.replace(frames / f"frame-{index:03}.png")
                        previous=digest
            except (OSError,subprocess.TimeoutExpired): pass
    try:
        run("xcrun", "simctl", "boot", device)
        run("xcrun", "simctl", "bootstatus", device, "-b", timeout=240)
        run("xcrun", "simctl", "ui", device, "appearance", "dark")
        worker=threading.Thread(target=capture_frames,daemon=True)
        worker.start()
        capabilities = {}
        for name, bundle in {"shortcuts": "com.apple.shortcuts", "appStore": "com.apple.AppStore", "camera": "com.apple.camera", "photos": "com.apple.mobileslideshow", "wallet": "com.apple.Passbook"}.items():
            check = subprocess.run(["xcrun", "simctl", "get_app_container", device, bundle, "app"], capture_output=True, text=True)
            capabilities[name] = check.returncode == 0
        (OUT / "capabilities.json").write_text(json.dumps(capabilities, indent=2))
        (OUT / "Capabilities.swift").write_text("enum ReferenceCapabilities {\n" + "\n".join(f"static let {key} = {str(value).lower()}" for key, value in capabilities.items()) + "\n}\n")
        if os.environ.get("CAPTURE_METHOD") == "direct":
            frames=OUT / "frames"
            frames.mkdir(exist_ok=True)
            log=[]
            subprocess.run(["xcrun","simctl","status_bar",device,"override","--time","9:41","--batteryState","charged","--batteryLevel","100"],capture_output=True,timeout=20)
            launch=subprocess.run(["xcrun","simctl","launch",device,"com.apple.shortcuts","-AppleLanguages","(fr)","-AppleLocale","fr_FR"],capture_output=True,text=True,timeout=30)
            log.append({"launch_returncode":launch.returncode,"stdout":launch.stdout,"stderr":launch.stderr})
            routes=[("direct-01-library","shortcuts://"),("direct-02-editor","shortcuts://create-shortcut"),("direct-03-gallery","shortcuts://gallery")]
            for name,url in routes:
                result=subprocess.run(["xcrun","simctl","openurl",device,url],capture_output=True,text=True,timeout=25)
                log.append({"name":name,"url":url,"returncode":result.returncode,"stderr":result.stderr})
                time.sleep(8)
                subprocess.run(["xcrun","simctl","io",device,"screenshot",str(frames/(name+".png"))],check=True,timeout=20)
                time.sleep(4)
                subprocess.run(["xcrun","simctl","io",device,"screenshot",str(frames/(name+"-settled.png"))],check=True,timeout=20)
            (OUT / "direct-capture.json").write_text(json.dumps(log,indent=2))
            return
        run("ruby", str(ROOT / "developpement/scripts/ios-reference/project.rb"), str(OUT))
        with (OUT / "xcodebuild.log").open("w") as log:
            run("xcodebuild", "test", "-project", str(OUT / "Reference.xcodeproj"),
                "-scheme", "Reference", "-destination", f"platform=iOS Simulator,id={device}",
                "-parallel-testing-enabled", "NO", "-maximum-concurrent-test-simulator-destinations", "1",
                "-resultBundlePath", str(OUT / "Reference.xcresult"), "CODE_SIGNING_ALLOWED=NO",
                *(["-only-testing:ReferenceUITests/SettingsReference/testShortcutsDetailed", "-only-testing:ReferenceUITests/SettingsReference/testShortcutsEditorReference", "-only-testing:ReferenceUITests/SettingsReference/testShortcutsAutomationReference", "-only-testing:ReferenceUITests/SettingsReference/testShortcutsGalleryReference"] if os.environ.get("CAPTURE_SCOPE") == "shortcuts" else []),
                stdout=log, stderr=subprocess.STDOUT, timeout=720)
    finally:
        stop_capture.set()
        # Preserve evidence even when a menu or test is unavailable on this runtime.
        subprocess.run(["xcrun", "simctl", "io", device, "screenshot", str(OUT / "last-screen.png")], check=False)
        if (OUT / "Reference.xcresult").exists():
            subprocess.run(["xcrun", "xcresulttool", "export", "attachments", "--path", str(OUT / "Reference.xcresult"), "--output-path", str(OUT / "screenshots")], check=False, timeout=90)
        subprocess.run(["xcrun", "simctl", "shutdown", device], check=False)


if __name__ == "__main__":
    main()
