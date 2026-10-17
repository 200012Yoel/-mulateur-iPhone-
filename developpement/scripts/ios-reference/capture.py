"""Manual macOS/Xcode reference capture; no remote desktop or Apple login."""
import json
import os
from pathlib import Path
import platform
import subprocess

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
    requested = os.environ.get("IOS_MAJOR", "26")
    exact = os.environ.get("IOS_VERSION", "").strip()
    runtimes = [r for r in inventory["runtimes"] if r.get("isAvailable")
                and r["identifier"].startswith("com.apple.CoreSimulator.SimRuntime.iOS-")
                and (requested == "auto" or r["version"].split(".")[0] == requested)
                and (not exact or r["version"] == exact)]
    if not runtimes:
        raise SystemExit(f"Aucun runtime iOS {requested} installé. Voir inventory.json. Aucun téléchargement automatique.")
    runtime = max(runtimes, key=lambda r: tuple(int(n) for n in r["version"].split(".")))
    types = [d for d in inventory["devicetypes"] if d["name"].startswith("iPhone")]
    model_name = os.environ.get("IOS_MODEL", "iPhone 17 Pro")
    model = next((d for d in types if d["name"] == model_name), None)
    if model is None:
        raise SystemExit(f"Le modèle demandé {model_name} est absent du runner.")
    run("ruby", "-rxcodeproj", "-e", "puts 'xcodeproj disponible'")
    device = run("xcrun", "simctl", "create", "Settings Reference", model["identifier"], runtime["identifier"], capture_output=True).stdout.strip()
    (OUT / "selection.json").write_text(json.dumps({"runtime": runtime, "deviceType": model, "udid": device}, indent=2))
    try:
        run("xcrun", "simctl", "boot", device)
        run("xcrun", "simctl", "bootstatus", device, "-b", timeout=240)
        run("xcrun", "simctl", "ui", device, "appearance", "dark")
        capabilities = {}
        for name, bundle in {"shortcuts": "com.apple.shortcuts", "appStore": "com.apple.AppStore", "camera": "com.apple.camera", "photos": "com.apple.mobileslideshow", "wallet": "com.apple.Passbook"}.items():
            check = subprocess.run(["xcrun", "simctl", "get_app_container", device, bundle, "app"], capture_output=True, text=True)
            capabilities[name] = check.returncode == 0
        (OUT / "capabilities.json").write_text(json.dumps(capabilities, indent=2))
        (OUT / "Capabilities.swift").write_text("enum ReferenceCapabilities {\n" + "\n".join(f"static let {key} = {str(value).lower()}" for key, value in capabilities.items()) + "\n}\n")
        run("ruby", str(ROOT / "developpement/scripts/ios-reference/project.rb"), str(OUT))
        with (OUT / "xcodebuild.log").open("w") as log:
            run("xcodebuild", "test", "-project", str(OUT / "Reference.xcodeproj"),
                "-scheme", "Reference", "-destination", f"platform=iOS Simulator,id={device}",
                "-parallel-testing-enabled", "NO", "-maximum-concurrent-test-simulator-destinations", "1",
                "-resultBundlePath", str(OUT / "Reference.xcresult"), "CODE_SIGNING_ALLOWED=NO",
                *(["-only-testing:ReferenceUITests/SettingsReference/testShortcutsDetailed", "-only-testing:ReferenceUITests/SettingsReference/testAppleIntelligenceAvailability", "-only-testing:ReferenceUITests/SettingsReference/testUpdates"] if os.environ.get("CAPTURE_SCOPE") == "shortcuts" else []),
                stdout=log, stderr=subprocess.STDOUT, timeout=720)
    finally:
        # Preserve evidence even when a menu or test is unavailable on this runtime.
        subprocess.run(["xcrun", "simctl", "io", device, "screenshot", str(OUT / "last-screen.png")], check=False)
        if (OUT / "Reference.xcresult").exists():
            subprocess.run(["xcrun", "xcresulttool", "export", "attachments", "--path", str(OUT / "Reference.xcresult"), "--output-path", str(OUT / "screenshots")], check=False)
        subprocess.run(["xcrun", "simctl", "shutdown", device], check=False)


if __name__ == "__main__":
    main()
