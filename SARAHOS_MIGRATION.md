# Migration du prototype vers SarahOS

## Statut et règles de conservation

Le dépôt contient aujourd'hui un prototype interactif monolithique dans
`index.html` (~1,9 Mo). Il reste la référence visuelle et comportementale
principale : aucun fichier existant n'est supprimé ni remplacé. Le commit
`f7c3a19` en conserve le snapshot d'origine.

SarahOS sera une ROM AOSP, et non une WebView, pour le **Redmi 13C 4G
(23106RN0DA, `gale`, Helio G85, 4 Go RAM)**. Aucune commande de flash, aucun
déverrouillage de bootloader et aucune écriture sur l'appareil ne font partie
de ce dépôt ou de cette étape.

## Inventaire observé du prototype

### Surface système

| Élément | Référence dans `index.html` | État / interactions observées |
| --- | --- | --- |
| Accueil, pages et dock | `app-grid-container`, `app-grid`, `dock` (~12708) | Grille réordonnable, emplacements persistés (`localStorage`), téléchargement/suppression simulés |
| Barre d'état / îlot dynamique | `dynamic-island`, `dynamic-island-expanded-view` (~12671) | Horloge, activité appel, enregistrement, minuteur, vues réduite/étendue |
| Navigation par geste | `home-indicator`, `initializeHomeIndicator` (~23962) | Retour à l'accueil, réduction d'app, geste tactile/souris |
| Sélecteur de tâches | `app-switcher` (~12747) | Deck/carrousel d'applications |
| Centre de contrôle | `control-center-overlay` (~25261) | Wi-Fi, Bluetooth, rotation, luminosité, volume, torche, calculatrice, caméra, QR, enregistrement, focus, recopie |
| Verrouillage / authentification | `face-id-modal`, `modal-auth-passcode`, `modal-power-off` | Animations d'authentification, code, extinction et fiche médicale |
| Clavier | `system-keyboard`, `initializeKeyboard` (~24112) | AZERTY, majuscules, dictée Web Speech, sons |
| Notifications | `showCallNotification`, widgets îlot dynamique | Notifications d'appel et d'enregistrement principalement simulées |

### Applications et écrans

Les modèles nommés sont inclus dans le même fichier : Téléphone (et appel),
Caméra, Wallet, Intelligence, Cartes, Réglages, Messages, Galerie, App Store,
YouTube, Instagram, 2048, Contacts, Horloge, Raccourcis et Safari. S'ajoutent
les pages Accueil, recherche, navigateur, onglets, favoris et historique de
Safari. Les écrans secondaires comprennent notamment : chat Messages, viseur
caméra/modes/zoom/minuteur, fiche et ajout de carte Wallet, détail/navigation
Cartes, détails App Store, lightbox Galerie, alarmes/chrono/minuteur Horloge,
éditeur Raccourcis et sélecteur d'onglets Safari.

### Comportements réutilisables comme spécification

- Appels avec minuterie, mise en attente, muet, haut-parleur, clavier et
  synthèse vocale simulée.
- Caméra avec viseur, inversion, flash, grille, portrait, compte à rebours et
  capture simulée.
- Horloge : alarmes, villes, chronomètre, minuteur et affichage dans l'îlot.
- Réglages et panneau Wi-Fi avec réseaux, mot de passe, batterie Web et
  bascules simulées.
- Galerie avec sélection, suppression, favoris, lightbox, médias et partage.
- Données persistées localement : positions d'applications et désinstallations
  simulées ; recherches, onglets/favoris/historique Safari ; états de widgets.
- Animations CSS identifiées : `spin-download`, `floatY`,
  `maps-location-pulse`, `spin-as`, `heartFadeOut`, `tileSpawn`, `fadeIn`,
  plus transitions de cartes, gestes, modales et îlot dynamique.

## Ce qui est conservé et ce qui est réécrit

| À conserver directement | À migrer / réécrire nativement |
| --- | --- |
| `index.html` complet comme maquette exécutable et oracle visuel | Toute structure HTML, CSS et JavaScript : vues Android `Compose`/Views, ressources XML, thèmes et animations Android |
| Palette, géométries, espacements, icônes SVG, états visuels et scénarios d'interaction | Launcher, SystemUI, Keyguard, Settings et navigation : APIs et composants AOSP, jamais un navigateur embarqué |
| Textes, modèles de données fictifs, contrats fonctionnels et jeux de test | `localStorage`, Web Speech, MediaDevices, Battery API, fetch et timers : Android framework, Room/DataStore, services système et permissions |
| Référence de toutes les animations CSS | `MotionLayout`, `ValueAnimator`, `RenderEffect`/transitions Compose, avec réduction du flou et des surfaces animées |

Les apps tierces simulées (YouTube, Instagram, App Store, Safari/iMessage,
Wallet) ne doivent pas usurper les applications ou services propriétaires :
elles deviennent des exemples visuels, des liens vers applications installées,
ou des apps SarahOS distinctes sans marques déposées.

## Arborescence cible AOSP

Cette arborescence sera introduite dans un checkout AOSP/LineageOS séparé ;
elle n'implique pas de copier le code AOSP dans ce petit dépôt de design.

```text
android/
  device/xiaomi/gale/                 # Device tree : init, overlays, produit
  kernel/xiaomi/gale/                 # Kernel compatible (à récupérer/build)
  vendor/xiaomi/gale/                 # Blobs propriétaires extraits légalement
  packages/apps/SarahLauncher/        # Accueil, dock, recherche, récents
  packages/apps/SarahSettings/        # Façade de réglages et panneaux SarahOS
  packages/apps/SarahAssistant/       # UI, dialogue, consentement, client IA
  packages/apps/SarahCamera/          # App caméra CameraX/Camera2, pas de HAL
  packages/apps/SarahGallery/         # MediaStore et visualiseur
  packages/modules/SarahDesign/       # Tokens, icônes, thèmes, animations
  packages/modules/SarahActions/      # API liée de commandes autorisées
  frameworks/base/packages/SystemUI/  # Extensions ciblées : QS, shade, notif.
  frameworks/base/packages/SettingsLib/# Préférences et composants partagés
  frameworks/base/core/res/res/values/# Overlays minimaux système
  vendor/sarahos/                     # Produit, permissions privilégiées, SEPolicy
```

Les chemins `android/device`, `android/kernel` et `android/vendor` n'existent
pas encore : ils seront créés seulement après sélection d'une base AOSP/ROM
compatible et audit des sources/blobs disponibles pour `gale`.

## Cartographie vers modules Android

| Référence | Module cible | Premier choix technique |
| --- | --- | --- |
| Accueil, dock, pages, recherche, récents | `SarahLauncher` | Kotlin + Compose, rôle `HOME`, `LauncherApps`, `RecyclerView`/Lazy grids |
| Barre d'état, shade, QS, îlot | `SystemUI` + `SarahDesign` | Fork minimal de SystemUI ; tuiles et notifications AOSP, animations légères |
| Verrouillage et code | Keyguard/SystemUI | Conserver l'authentification Android (Gatekeeper/biométrie), changer uniquement l'UI via overlay/fork ciblé |
| Réglages et Wi-Fi | `SarahSettings` + SettingsLib | Intents/Settings Provider ; ne jamais modifier directement les radios |
| Horloge/minuteur/alarmes | app SarahOS + `AlarmManager` | Alarmes exactes autorisées, foreground service seulement si nécessaire |
| Caméra/Galerie | SarahCamera/SarahGallery | Camera2/CameraX et MediaStore ; HAL/bibliothèques fournisseur inchangés |
| Appels, messages, cartes, navigateur | Intégrations Android séparées | Telecom/RoleManager, SMS par rôle, intents ; aucune dépendance aux APIs Apple |
| Assistant Intelligence/Sarah | `SarahAssistant` + `SarahActions` | Binder AIDL signé, liste blanche d'actions, UI de consentement et journal local |

## Sarah : modèle de sécurité

Sarah n'obtient **ni shell root, ni `su`, ni exécution de commande arbitraire**.
Une action est un appel AIDL typé et signé, validé par un courtier local :

1. L'UI ou le moteur IA demande une action identifiée, avec arguments bornés.
2. `SarahActions` vérifie l'appelant, le schéma, l'état du téléphone et la
   permission/consentement utilisateur.
3. Un adaptateur restreint appelle une API Android adaptée (`Intent`,
   `CameraManager`, `Settings`, `MediaStore`, etc.).
4. Le résultat typé et un journal minimal sont renvoyés ; aucun accès brut aux
   fichiers, paramètres Secure ou services Binder non explicitement autorisés.

Actions initiales : ouvrir une application, ouvrir une page de réglages,
capturer après consentement, rechercher/lire un fichier explicitement choisi,
contrôler un minuteur, et utiliser les services autorisés. Les actions à impact
élevé (appel, SMS, suppression de fichier, caméra/micro, réseau) affichent un
consentement contextuel et respectent les permissions Android.

## Plan par étapes

1. **Fondation de migration (en cours)** — figer la référence, documenter
   l'inventaire, créer les contrats Kotlin sans toucher au prototype.
2. **Design system natif** — extraire tokens, icônes autorisées et animations
   vers `SarahDesign`, avec captures de comparaison.
3. **Launcher** — rendre SarahLauncher installable sur émulateur AOSP, puis
   migrer accueil, dock, recherche et récents.
4. **SarahActions et Assistant** — construire le courtier AIDL, tests de
   refus, consentement et journaux ; seulement ensuite connecter un modèle IA.
5. **Apps SarahOS** — caméra, galerie, horloge et réglages, sur APIs Android.
6. **SystemUI/Keyguard** — fork ciblé et overlays ; mesure stricte mémoire et
   fluidité avant chaque nouvelle surface.
7. **Bring-up `gale`** — base compatible, device tree, kernel, blobs vendor,
   SELinux, build ; tests d'abord en émulateur puis appareil de test.
8. **Validation et installation manuelle** — sauvegarde, build signé, tests
   radio/caméra/audio/capteurs ; le flash ne sera envisagé qu'avec validation
   explicite de votre part.

## Budget 4 Go RAM et garde-fous

- Pas de moteur Web persistant ni service IA toujours actif ; démarrage à la
  demande, limites de processus et réponses en streaming.
- Préférer ressources vectorielles, listes paresseuses, caches bornés et
  animations GPU courtes ; limiter les flous et captures d'écran live.
- Mesurer PSS, jank et démarrages froids sur cible avant de fusionner les
  changements SystemUI/Launcher.
- Conserver le kernel, les HAL et blobs de `gale` pour caméra, GPU, modem,
  Wi-Fi, Bluetooth, audio et capteurs ; ne pas développer de pilotes maison.

## Première implémentation

Après validation de ce document dans Git, l'étape 1 ajoute un contrat Kotlin
de liste blanche pour Sarah dans `sarahos/contracts/`. Il est volontairement
indépendant d'AOSP afin d'être relu et testé avant l'intégration dans
`packages/modules/SarahActions`.
