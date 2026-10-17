# Référence iOS sur GitHub Actions

Lancement **manuel uniquement**, sur `macos-15`, limité à 20 minutes. Aucun
compte Apple, secret, bureau distant ou tunnel réseau. Le script choisit un
runtime déjà installé (iOS 18 par défaut), crée un iPhone 16 compatible, démarre
le simulateur en sombre et exécute des tests XCUITest sur l’app Réglages native.
Il capture les écrans et arbres d’accessibilité : accueil, Wi-Fi, Apps, Safari,
mise à jour. Les menus absents sont signalés comme ignorés, jamais comme vérifiés.

Les résultats sont dans l’artefact `ios-settings-reference`, conservé 7 jours.
Le résultat `.xcresult` et le journal permettent de diagnostiquer tout échec.
Le runner doit fournir Xcode, un runtime iOS approprié et le gem Ruby `xcodeproj`
(utilisé par CocoaPods). Aucune dépendance ni runtime volumineux n’est installé
automatiquement. `auto` sélectionne la version installée la plus récente.

Ce n’est pas un appareil permanent ni une session interactive dans le navigateur.
Le simulateur ne reproduit pas tout le matériel d’un iPhone et ne permet pas
de garantir les fonctions App Store ou les mises à jour d’applications réelles.

Après accord : installer ce workflow et son dossier de scripts sur la branche
par défaut, puis déclencher **Capturer les vrais Réglages iOS** dans Actions.
La création de fichiers sur une branche ne lance aucune machine.

Validation locale Windows : syntaxe Python uniquement. La compilation Swift,
le projet Xcode et les captures restent à valider lors du premier lancement macOS.
