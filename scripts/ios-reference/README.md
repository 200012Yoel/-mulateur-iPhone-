# Référence iOS sur GitHub Actions

Lancement **manuel uniquement**, sur `macos-15`, limité à 20 minutes. Aucun
compte Apple, secret, bureau distant ou tunnel réseau. Le script choisit un
runtime déjà installé (iOS 26 par défaut, ou `IOS_MAJOR=18`), crée un iPhone 16 Pro Max, démarre
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

Première exécution macOS validée le 17 octobre 2026 : iPhone 16 Pro Max,
iOS 18.6, compilation Swift et tests natifs réussis. Deux tests ont réussi et
deux ont été ignorés : Wi-Fi et Mise à jour logicielle ne sont pas présents dans
le runtime testé. [Résultats](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39062276956).
L’attente du chargement de la liste Apps a ensuite été renforcée ; cette dernière
modification n’a pas déclenché une nouvelle session cloud.


Le 17 octobre 2026, les références iOS 26.2 ont été capturées avec succès sur
le même modèle. La session étendue comprend 14 tests, dont 7 réussis et 7 ignorés,
et 19 captures. Photos et Wallet sont présents ; Appareil photo ne l’est pas.
Aucune mise à jour OTA n’est possible dans le menu manquant. Voir le
[rapport complet](../../docs/ios-reference/README.md) pour les résultats et limites.


L’entrée `scope=shortcuts` limite la session aux tests détaillés de Raccourcis,
à la page de disponibilité Apple Intelligence et au menu de mise à jour. Les
captures couvrent les recherches d’actions, l’éditeur, Automatisation et Galerie
quand ces contrôles sont présents. Les options absentes ne sont pas inventées ;
la capture ne force pas le téléchargement de modèles ni la connexion à un compte.

Session détaillée validée : 3 tests, 1 réussi, 2 ignorés, 15 captures PNG ; voir
le [rapport Raccourcis](../../docs/ios-reference/shortcuts/README.md).
