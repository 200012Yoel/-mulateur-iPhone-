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
