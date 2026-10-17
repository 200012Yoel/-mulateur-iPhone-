# Références iPhone 17 Pro Max / Raccourcis 3.2

Session du 18 octobre 2026 (Europe/Paris). Le profil web reste iOS 27.1 ; les
captures natives utilisent iOS 27.0 avec accord explicite de l’utilisateur.

## Origine des images

- [Parcours XCTest](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39072431783) :
  iPhone 17 Pro Max, runtime 27.0, build 24A434, écran 1320 × 2868 pixels.
  Les 15 images chronologiques montrent principalement la bibliothèque. Le parcours
  a échoué : un test en échec et trois ignorés. Les menus ignorés ne sont pas validés.
- [Capture directe](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39073684055) :
  même modèle/runtime, ouverture native de l’app, de l’éditeur et de la galerie.
  Les trois appels `simctl openurl` et le lancement ont renvoyé zéro. Six captures
  nommées ont été prises, dont une seconde image après stabilisation pour chaque vue.
- Trois images originales sont conservées dans `native27/`. Les séries complètes,
  inventaires et journaux restent dans les artefacts GitHub et dans le dossier local
  ignoré `developpement/sorties/native-<identifiant>/`. Les artefacts GitHub expirent
  après sept jours ; les trois images du dépôt conservent la référence essentielle.

Les URL utilisées sont documentées par Apple :
[ouvrir/créer](https://support.apple.com/en-kw/guide/shortcuts/apda283236d7/ios),
[galerie](https://support.apple.com/guide/shortcuts/apd9c112ca23/ios).
L’ouverture d’une route ne prouve pas que son contenu distant a été chargé.

## Observations reproduites

La bibliothèque native présente Sélectionner en haut, un ajout flottant centré
en bas, un titre et une recherche à gauche, et l’état vide Aucun raccourci.
L’éditeur présente une petite icône colorée à côté du nom, un bouton de détail,
une instruction centrale et un panneau inférieur occupant environ 46 % de l’écran.
Dans iOS 27, la première catégorie visible est Automatisation, suivie de Scripts
et Commandes ; le champ affiche Rechercher.

La surface web est désormais de 440 × 956 points, hors cadre, soit les dimensions
logiques de la capture divisées par trois. Les espacements principaux et les
boutons sont ajustés sur ces images. Les polices restent les polices système du
navigateur ; aucune identité au pixel près n’est déclarée.

La galerie native reste sur CHARGEMENT EN COURS. Ses cartes distantes ne sont donc
pas validées ; la version web conserve des modèles locaux utilisables et filtrables.
Les détails d’automatisation s’appuient sur les références historiques iOS 26 et
la documentation Apple, pas sur une capture complète du menu sous iOS 27.

## REA et validation web

Le skill officiel morluto/rea, version 42, a été réinstallé avec sauvegarde.
REA CLI 6.5.0 a été utilisé pour `capture-browser-scenario`, sans changer la
configuration MCP de Codex ni installer de moteur de décompilation natif.
L’observation du vrai iPhone provient de simctl/XCTest ; elle n’est pas attribuée à REA.

Le scénario reproductible est `developpement/scripts/shortcuts-scenario.json`.
Le serveur de prévisualisation sert uniquement raccourcis.html et raccourcis.js sur
127.0.0.1:8767 ; le reste du projet et le dossier .git ne sont pas exposés.
Les preuves REA complètes, leurs captures et leurs limites sont enregistrées en
JSON dans `developpement/sorties/rea/`, hors du dépôt.

Fonctions vérifiées : conservation des données, chaînes d’actions, deux modes,
import/export, annulation, dossiers, déplacement multiple, recherche dans la galerie,
déclencheurs recherchables, actions des apps actualisées et dialogues au clavier.
Apple Intelligence est un traitement local de démonstration ; les déclencheurs
matériels iOS et les services iCloud ne sont pas exécutés par le navigateur.

Tests : shortcuts-rewrite.cjs, shortcuts-data.cjs, shortcuts-library.cjs,
device-profile.cjs. Les tests d’intégration Réglages, thème sombre, appareil photo,
Photos et changement d’app sont également passés après le changement de format.
