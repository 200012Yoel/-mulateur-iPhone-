# Émulateur iPhone (iOS Web Simulator)

Émulateur et simulateur interactif d'iPhone pour le Web, reproduisant l'expérience iOS avec ses applications natives, animations, widgets et fonctionnalités interactives.

## 🚀 Démo en ligne (GitHub Pages)

Une fois GitHub Pages activé :
👉 **https://200012yoel.github.io/-mulateur-iPhone-/**

## ✨ Fonctionnalités

- Interface iOS ultra-réaliste avec Dynamic Island & barre d'état dynamique
- Écran d'accueil interactif avec grille d'applications et widgets
- Applications natives fonctionnelles (Appareil photo, Messages, Safari, Calculatrice, Paramètres, Musique, etc.)
- Centre de contrôle et centre de notifications
- Support responsive et tactile

## Réglages interactifs

Les 26 rubriques de Réglages ouvrent des sous-menus : Wi-Fi (détails du réseau,
IP, DNS, proxy), Bluetooth, Général, accessibilité, affichage, notifications,
concentration, confidentialité et préférences des applications. Une recherche
filtre les rubriques. Les choix sont conservés dans le stockage local du navigateur.
Le téléphone et les surfaces des applications utilisent un thème sombre ; le fond
du site est gris. Les photos, vidéos et icônes conservent leurs couleurs.
Le Wi-Fi propose une liste de réseaux, des boutons d’information et une saisie de
mot de passe fictif (non conservé). Le menu Apple Intelligence et Siri propose
les préférences de langue, voix, réponses et ChatGPT, sans appeler ces services.

Les barres de navigation et les boutons utilisent un effet Liquid Glass sombre.
Les choix ouvrent des listes avec une coche, utilisables au clavier. Les options
de contraste et de réduction de transparence sont respectées dans ces menus.
Le Wi-Fi permet de mémoriser ou oublier un réseau, créer un réseau personnalisé,
configurer manuellement IP/DNS/proxy et régler la connexion aux partages.

Dans Général → Mise à jour logicielle, une démonstration propose téléchargement,
préparation, installation et état « à jour ». La progression reprend au retour
dans le menu et son état est conservé après rechargement. Le choix « cette nuit »
est uniquement mémorisé : aucun travail en arrière-plan n’est programmé. Les
préférences automatiques et bêta sont des sous-menus distincts.
Les menus s’appuient sur les guides Apple [Mise à jour iOS](https://support.apple.com/fr-fr/guide/iphone/iph3e504502/ios)
et [Réglages Wi-Fi](https://support.apple.com/fr-fr/guide/iphone/iphw5gjwl8k2/ios) ;
le visuel reste une interprétation web.

Ce projet est une simulation web indépendante, pas un environnement d’exécution
iOS. Les réseaux, accessoires, informations matérielles et comptes présentés sont
des démonstrations. Les autres options mémorisent des préférences simulées ; elles
ne modifient pas le matériel, les autorisations du navigateur ou les services Apple.
La reproduction exacte d’iOS 27 n’a pas été vérifiée sur un appareil de référence.

Ouvrir `index.html` ou servir ce dossier comme site statique. Conserver
`settings-simulator.js`, `settings-simulator.css`, `dark-theme.js` et
`dark-theme.css` et `liquid-glass.css` à côté d’`index.html`.

Tests navigateur : avec Playwright installé, exécuter `node tests/settings.cjs`
ainsi que `node tests/dark-apps.cjs` et `node tests/update-system.cjs`.
La variable `CHROME_PATH` permet d’utiliser un
Chrome installé. Les cartes nécessitent l’accès à leur dépendance Leaflet externe.
