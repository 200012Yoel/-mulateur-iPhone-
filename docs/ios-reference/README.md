# Référence native observée — 17 octobre 2026

[Session GitHub Actions](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39062276956)
— commit exécuté `bb5cfee72ed9bb8317bf9f182efb0876ab500115`.

Le simulateur Xcode a démarré avec le type **iPhone 16 Pro Max**, iOS **18.6**,
build **22G86**, sur un runner macOS 15 ARM64. L’apparence était sombre et
l’application Réglages a été lancée en français. La machine temporaire a été
arrêtée après les captures ; ce n’est pas un appareil distant permanent.

Résultat : 4 tests exécutés, 2 réussis et 2 ignorés, aucun échec. Le workflow est
vert mais cela ne signifie pas que tous les écrans demandés ont été observés.

## Observations et adaptations

- L’accueil Réglages est visible dans [settings-ios18.png](settings-ios18.png).
- L’arbre d’accessibilité du menu Apps contient « Apps par défaut », des sections
  alphabétiques, un index latéral et les apps installées. Les lignes mesurent
  44 points et les icônes environ 29 points. La première image Apps a été capturée
  avant le remplissage visuel de la liste : son image vide n’est pas une référence
  fiable pour les icônes. Le script a ensuite été corrigé pour attendre le contenu.
- Les préférences Safari sont visibles dans
  [safari-settings-ios18.png](safari-settings-ios18.png) : Siri, Recherche,
  navigateur par défaut, langue, moteur de recherche et suggestions.
- Le projet web reprend les sections alphabétiques, l’index, les lignes compactes,
  le menu Apps par défaut et les préférences Safari observées. Il garde les icônes
  de son registre partagé, sans prétendre avoir extrait les icônes natives.

## Limites observées

Le test Wi-Fi n’a pas trouvé ce menu dans le simulateur. Le test de mise à jour a
atteint Général, mais n’a pas trouvé Mise à jour logicielle. Ces deux tests sont
explicitement ignorés ; les menus web correspondants restent des reproductions
documentaires et des simulations. Aucun App Store réel ni Raccourcis natif n’a été
ouvert durant cette session. Leur examen reste à faire si une référence accessible
est disponible. Les préférences Safari du projet sont simulées : elles ne pilotent
pas les services Apple ou les sites externes affichés dans Safari.

Les captures et arbres complets figurent dans l’artefact `ios-settings-reference`
de cette session, annoncé par GitHub comme conservé jusqu’au 24 octobre 2026.
Les deux images ci-dessus restent disponibles dans le dépôt après cette échéance.

## Deuxième session : captures élargies

[Session du 17 octobre 2026](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39063404091),
commit `27b10b46357691f364abfd47be2e6629e541efa3`, même modèle et runtime.
Onze tests ont été exécutés : cinq réussis, six ignorés et aucun échec. L’artefact
contient 17 images, y compris cinq captures de diagnostic « menu indisponible ».
Le contrôle de disponibilité confirme Raccourcis installé et App Store absent.

Captures utiles conservées : [Apps](extended/apps.png), [Général](extended/general.png),
[Réglages milieu](extended/settings-middle.png), [Réglages bas](extended/settings-bottom.png),
[Raccourcis](extended/shortcuts.png), [Automatisation](extended/automation.png),
[Galerie](extended/gallery.png), [Sélecteur d’apps](extended/switcher.png).

Les captures montrent les onglets Raccourcis/Automatisation/Galerie, les grandes
rubriques, la recherche, les cartes, l’état vide d’automatisation et les cartes
superposées du sélecteur. Ces éléments ont guidé le module web réécrit et les
proportions des aperçus. La capture du geste suivant ne prouve pas la fermeture
native d’une carte : ce geste n’est donc pas annoncé comme validé sur iOS. La
fermeture du simulateur web est, elle, testée par glissement et au clavier.

Batterie, Recharge, AirDrop, Wi-Fi et Mise à jour logicielle sont absents du runtime
observé. Les nouveaux écrans Batterie/Recharge/AirDrop du projet sont donc des
interprétations web, pas des reproductions vérifiées par ces captures. Les valeurs
de charge et d’activité sont fictives. La limite par pas de 5 % et la disponibilité
de Recharge optimisée uniquement à 100 % suivent la
[documentation Apple](https://support.apple.com/fr-fr/108055).
Les propositions iOS 26 puis iOS 27 suivent la
[présentation Apple](https://support.apple.com/fr-ca/118575), sans téléchargement réel.

L’éditeur Raccourcis web et son moteur local ne reproduisent qu’un sous-ensemble
des actions iOS. Une correspondance intégrale, écran par écran, n’est pas certifiée.
