import XCTest

final class SettingsReference: XCTestCase {
    let settings = XCUIApplication(bundleIdentifier: "com.apple.Preferences")

    override func setUpWithError() throws {
        continueAfterFailure = false
        settings.launchArguments = ["-AppleLanguages", "(fr)", "-AppleLocale", "fr_FR"]
        settings.launch()
        XCTAssertTrue(settings.wait(for: .runningForeground, timeout: 15))
    }

    func capture(_ name: String, app: XCUIApplication? = nil) {
        // Query the hierarchy first: Apps can render its navigation before its list.
        let description = (app ?? settings).debugDescription
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
    func testBattery() throws {
        try open(["Batterie", "Battery"])
        capture("06-battery-top")
        settings.swipeUp()
        capture("07-battery-bottom")
    }
    func testCharging() throws {
        try open(["Batterie", "Battery"])
        try open(["Recharge", "Charging"])
        capture("08-charging")
    }
    func testAirDrop() throws {
        try open(["Général", "General"])
        capture("09-general")
        try open(["AirDrop"])
        capture("10-airdrop")
    }
    func testSettingsSections() {
        capture("11-settings-top")
        settings.swipeUp()
        capture("12-settings-middle")
        settings.swipeUp()
        capture("13-settings-bottom")
    }
    func testShortcuts() throws {
        guard ReferenceCapabilities.shortcuts else { throw XCTSkip("Raccourcis non installé dans ce runtime") }
        let app = XCUIApplication(bundleIdentifier: "com.apple.shortcuts")
        app.launchArguments = ["-AppleLanguages", "(fr)", "-AppleLocale", "fr_FR"]
        app.launch()
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: 15))
        capture("14-shortcuts", app: app)
        for (label, name) in [("Automatisation", "15-shortcuts-automation"), ("Galerie", "16-shortcuts-gallery")] {
            let tab = app.tabBars.buttons[label]
            if tab.waitForExistence(timeout: 5) { tab.tap(); capture(name, app: app) }
        }
    }
    func shortcutsReference() throws -> XCUIApplication {
        guard ReferenceCapabilities.shortcuts else { throw XCTSkip("Raccourcis absent") }
        let app = XCUIApplication(bundleIdentifier: "com.apple.shortcuts")
        app.launchArguments = ["-AppleLanguages", "(fr)", "-AppleLocale", "fr_FR"]
        app.launch()
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: 25))
        for label in ["Continuer", "Continue", "Commencer", "Get Started"] {
            let button = app.buttons[label].firstMatch
            if button.exists && button.isHittable { button.tap() }
        }
        return app
    }
    func testShortcutsDetailed() throws {
        let app = try shortcutsReference()
        capture("sc-01-library", app: app)
        for label in ["Modifier", "Edit"] {
            let button=app.buttons[label].firstMatch
            if button.exists && button.isHittable { button.tap(); capture("sc-02-library-edit", app: app); break }
        }
    }
    func testShortcutsEditorReference() throws {
        let app = try shortcutsReference()
        let add = app.buttons.matching(NSPredicate(format: "label ==[c] 'ajouter' OR label ==[c] 'add' OR label == '+'")).firstMatch
        guard add.waitForExistence(timeout: 8) else { capture("sc-editor-add-unavailable", app: app); throw XCTSkip("Bouton Ajouter absent") }
        add.tap(); capture("sc-03-editor", app: app)
        for label in ["Scripts", "Appareil", "Documents", "Apps"] {
            let button = app.buttons[label].firstMatch
            if button.exists && button.isHittable { button.tap(); capture("sc-category-" + label, app: app); break }
        }
        let search=app.searchFields.firstMatch
        if search.exists && search.isHittable {
            search.tap()
            if app.keyboards.firstMatch.waitForExistence(timeout: 3) {
                search.typeText("Texte"); capture("sc-04-search-text", app: app)
            } else { capture("sc-04-search-no-keyboard", app: app) }
        }
        app.swipeUp(); capture("sc-05-editor-lower", app: app)
    }
    func testShortcutsAutomationReference() throws {
        let app = try shortcutsReference()
        let tab=app.buttons["Automatisation"].firstMatch
        guard tab.waitForExistence(timeout: 5) else { throw XCTSkip("Onglet Automatisation absent") }
        tab.tap(); capture("sc-06-automation", app: app)
        for label in ["Nouvelle automatisation", "Créer une automatisation personnelle", "New Automation"] {
            let b=app.buttons[label].firstMatch
            if b.exists && b.isHittable { b.tap(); capture("sc-07-automation-triggers", app: app); app.swipeUp(); capture("sc-08-automation-triggers-lower", app: app); break }
        }
    }
    func testShortcutsGalleryReference() throws {
        let app = try shortcutsReference()
        let tab=app.buttons["Galerie"].firstMatch
        guard tab.waitForExistence(timeout: 5) else { throw XCTSkip("Onglet Galerie absent") }
        tab.tap(); capture("sc-09-gallery", app: app)
        app.swipeUp(); capture("sc-10-gallery-lower", app: app)
    }
    func testAppleIntelligenceAvailability() throws {
        try open(["Apple Intelligence et Siri", "Apple Intelligence & Siri"])
        capture("sc-07-intelligence-settings")
        settings.swipeUp(); capture("sc-08-intelligence-settings-lower")
        // Availability is observed; a missing native model is never represented as enabled.
    }
    func captureInstalled(_ installed: Bool, bundle: String, name: String) throws {
        guard installed else { throw XCTSkip(name + " non installé dans ce runtime") }
        let app = XCUIApplication(bundleIdentifier: bundle)
        app.launchArguments = ["-AppleLanguages", "(fr)", "-AppleLocale", "fr_FR"]
        app.launch()
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: 15))
        capture(name, app: app)
    }
    func testCamera() throws { try captureInstalled(ReferenceCapabilities.camera, bundle: "com.apple.camera", name: "20-camera") }
    func testPhotos() throws { try captureInstalled(ReferenceCapabilities.photos, bundle: "com.apple.mobileslideshow", name: "21-photos") }
    func testWallet() throws { try captureInstalled(ReferenceCapabilities.wallet, bundle: "com.apple.Passbook", name: "22-wallet") }
    func testAppStore() throws {
        guard ReferenceCapabilities.appStore else { throw XCTSkip("App Store non installé dans ce runtime") }
        let app = XCUIApplication(bundleIdentifier: "com.apple.AppStore")
        app.launch()
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: 15))
        capture("17-appstore", app: app)
    }
    func testSwitcher() {
        XCUIDevice.shared.press(.home)
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let start = springboard.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.99))
        let middle = springboard.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.48))
        start.press(forDuration: 0.1, thenDragTo: middle, withVelocity: .slow, thenHoldForDuration: 0.8)
        capture("18-switcher-gesture", app: springboard)
        let top = springboard.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.04))
        middle.press(forDuration: 0.1, thenDragTo: top)
        capture("19-switcher-dismiss-gesture", app: springboard)
    }
}

extension XCUIElement {
    func clearAndEnterText(_ text: String) {
        tap()
        if let value = value as? String, value != placeholderValue {
            typeText(String(repeating: XCUIKeyboardKey.delete.rawValue, count: value.count))
        }
        if !text.isEmpty { typeText(text) }
    }
}
