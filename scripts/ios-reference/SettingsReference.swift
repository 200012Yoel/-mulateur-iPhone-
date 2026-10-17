import XCTest

final class SettingsReference: XCTestCase {
    let settings = XCUIApplication(bundleIdentifier: "com.apple.Preferences")

    override func setUpWithError() throws {
        continueAfterFailure = false
        settings.launchArguments = ["-AppleLanguages", "(fr)", "-AppleLocale", "fr_FR"]
        settings.launch()
        XCTAssertTrue(settings.wait(for: .runningForeground, timeout: 15))
    }

    func capture(_ name: String) {
        // Query the hierarchy first: Apps can render its navigation before its list.
        let description = settings.debugDescription
        let image = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        image.name = name
        image.lifetime = .keepAlways
        add(image)
        let tree = XCTAttachment(string: description)
        tree.name = name + "-accessibility"
        tree.lifetime = .keepAlways
        add(tree)
    }

    func open(_ labels: [String]) throws {
        for _ in 0..<14 {
            for label in labels {
                let cell = settings.cells.matching(NSPredicate(format: "label CONTAINS[c] %@", label)).firstMatch
                let text = settings.staticTexts[label].firstMatch
                if text.exists && text.isHittable { text.tap(); return }
                if cell.exists && cell.isHittable { cell.tap(); return }
            }
            settings.swipeUp()
        }
        capture("menu-unavailable")
        throw XCTSkip("Menu absent du runtime : " + labels.joined(separator: ", "))
    }

    func testRoot() { capture("01-settings") }
    func testWifi() throws { try open(["Wi-Fi"]); capture("02-wifi") }
    func testApps() throws {
        try open(["Apps"])
        XCTAssertTrue(settings.buttons["com.apple.Settings.Apps.DefaultApps"].waitForExistence(timeout: 15))
        capture("03-apps")
        try open(["Safari"])
        capture("04-app-safari")
    }
    func testUpdates() throws {
        try open(["Général", "General"])
        try open(["Mise à jour logicielle", "Software Update"])
        capture("05-software-update")
    }
}
