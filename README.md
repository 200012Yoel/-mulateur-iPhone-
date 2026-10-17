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

Batterie dispose d’historiques fictifs sur 24 heures et 10 jours, d’une ventilation
par app, d’un écran de santé et d’une limite de recharge 80/85/90/95/100 %. La
recharge optimisée n’est proposée qu’à 100 %. AirDrop possède les trois choix de
réception et les préférences de partage. Ces fonctions ne pilotent pas de matériel.

Les barres de navigation et les boutons utilisent un effet Liquid Glass sombre.
Le menu Apps partage la liste et les icônes de l’accueil. Les installations et
modifications sont reflétées via les événements du simulateur ;
`window.updateSimulatorApp(id, { name, iconURL, version })` met à jour les deux
interfaces. Les icônes distantes doivent avoir une URL HTTP(S). Il ne s’agit pas
d’une synchronisation avec les mises à jour du véritable App Store Apple.
Les choix ouvrent des listes avec une coche, utilisables au clavier. Les options
de contraste et de réduction de transparence sont respectées dans ces menus.
Le Wi-Fi permet de mémoriser ou oublier un réseau, créer un réseau personnalisé,
configurer manuellement IP/DNS/proxy et régler la connexion aux partages.

Dans Général → Mise à jour logicielle, une démonstration propose téléchargement,
préparation, installation et état « à jour ». La progression reprend au retour
dans le menu et son état est conservé après rechargement. Le choix « cette nuit »
est uniquement mémorisé : aucun travail en arrière-plan n’est programmé. Les
préférences automatiques et bêta sont des sous-menus distincts.
L’écran présente iOS 26 et, en dessous, une proposition iOS 27, selon la
[disposition documentée par Apple](https://support.apple.com/fr-ca/118575).
Ce ne sont pas des mises à jour réellement proposées par un serveur Apple.
Les menus s’appuient sur les guides Apple [Mise à jour iOS](https://support.apple.com/fr-fr/guide/iphone/iph3e504502/ios)
et [Réglages Wi-Fi](https://support.apple.com/fr-fr/guide/iphone/iphw5gjwl8k2/ios) ;
le visuel reste une interprétation web.

## Capturer un véritable simulateur iOS

Le workflow manuel et ses scripts sont décrits dans
[scripts/ios-reference/README.md](scripts/ios-reference/README.md).
Leur publication sur une branche ne lance pas de session. Le premier lancement
macOS a réussi sur iPhone 16 Pro Max / iOS 18.6 :
[observations et limites](docs/ios-reference/README.md).

## Raccourcis et multitâche

Raccourcis a été réécrit en module séparé : onglets Raccourcis, Automatisation et
Galerie, création/renommage, sélection/suppression, édition et réorganisation
de plusieurs actions. L’exécution locale prend en charge l’ouverture d’apps,
l’affichage de texte, le Wi-Fi et le mode économie d’énergie simulés. Les
automatisations sont des scénarios testables manuellement, sans tâches natives
en arrière-plan. Les données `ios_shortcuts` existantes sont conservées et migrées.
Les centaines d’actions et les services du véritable Raccourcis ne sont pas inclus.

Le sélecteur utilise des aperçus isolés dans des Shadow DOM pour préserver leur
style sans ajouter d’identifiants en double à la page. Le glissement vers le haut
ferme une app ; un glissement trop court revient en place. Une app fermée n’est
plus rouverte par le clic qui suit le geste. Suppr/Retour arrière ferme la carte
au clavier. Fermer les apps ne supprime pas les données enregistrées.

Ce projet est une simulation web indépendante, pas un environnement d’exécution
iOS. Les réseaux, accessoires, informations matérielles et comptes présentés sont
des démonstrations. Les autres options mémorisent des préférences simulées ; elles
ne modifient pas le matériel, les autorisations du navigateur ou les services Apple.
La reproduction exacte d’iOS 27 n’a pas été vérifiée sur un appareil de référence.

Ouvrir `index.html` ou servir ce dossier comme site statique. Conserver
`settings-simulator.js`, `settings-simulator.css`, `dark-theme.js` et
`dark-theme.css` et `liquid-glass.css` à côté d’`index.html`.
Conserver également `shortcuts-simulator.js`, `shortcuts-simulator.css` et
`system-interactions.js` avec les autres fichiers du site.

Tests navigateur : avec Playwright installé, exécuter `node tests/settings.cjs`
ainsi que `node tests/dark-apps.cjs` et `node tests/update-system.cjs`.
`node tests/apps-live.cjs` vérifie les icônes et les mises à jour de la liste Apps.
`node tests/expanded-system.cjs` vérifie Batterie, Recharge, les deux versions de
mise à jour, AirDrop, Raccourcis multi-actions et la fermeture des applications.
La variable `CHROME_PATH` permet d’utiliser un
Chrome installé. Les cartes nécessitent l’accès à leur dépendance Leaflet externe.


Le compte Apple dispose d’une page dédiée, de sous-menus (identité, sécurité,
iCloud, paiements, abonnements, famille, Localiser) et de fiches pour trois
appareils fictifs. Le nom et la liste d’appareils sont locaux : il ne s’agit pas
d’une connexion au compte Apple du visiteur. iCloud présente la photothèque locale
sans envoyer de données sur un service distant.

Les graphiques Batterie sont sélectionnables et proposent l’affichage par durée
ou pourcentage. En Wi-Fi, les champs IP et DNS dépendent du mode automatique ou
manuel. Luminosité, texte gras, animations réduites et économie d’énergie ont des
effets visibles sur le téléphone simulé.

`wallet-simulator.js` et `wallet-simulator.css` fournissent un portefeuille local
de billets et de cartes de fidélité fictifs : ajout, recherche, détail, renommage
et suppression. Aucune carte bancaire ni transaction n’est prise en charge.
Les réglages de grille et de qualité vidéo sont repris à l’ouverture d’Appareil
photo. Les captures caméra rejoignent la photothèque partagée de Photos.
Raccourcis propose les apps actuellement installées et un ensemble explicite
d’actions de navigation, notamment ouvrir Wi-Fi, Batterie et les mises à jour.
Installer une app ne crée pas arbitrairement de nouvelles capacités natives.

`node tests/account-connected.cjs` vérifie le compte, les appareils, les graphiques,
Wallet, les actions et le cycle complet iOS 26 avec captures des étapes.
`node tests/camera-photos.cjs` vérifie les réglages caméra et une prise de vue avec
le périphérique vidéo de test de Chromium, suivie de son ouverture dans Photos.


Conserver aussi `photos-enhancements.css`, `wallet-simulator.js` et
`wallet-simulator.css` avec le site. Photos possède des collections Favoris et
Vidéos, une recherche locale et des favoris persistants. La caméra enregistre de
courtes vidéos WebM via MediaRecorder, stockées avec une vignette dans le
navigateur ; la résolution demandée dépend des réglages, et la résolution obtenue
dépend de la caméra. Les modes Cinématique, Ralenti et Accéléré restent des
présentations de démonstration. Les enregistrements n’incluent pas de microphone.
Le stockage du navigateur est limité : les longues vidéos ne conviennent pas à
ce stockage local. Le flux caméra est arrêté à la sortie de l’app.


### Deux versions de Raccourcis

Dans Raccourcis, le bouton ⚙ ouvre les réglages. « Version de Raccourcis »
permet de choisir **Classique** ou **Apple Intelligence**. Ce même choix est
accessible dans Réglages > Apps > Raccourcis. Le choix est conservé dans
`iphone.settings.v1`, clé `App : Raccourcis/Version de Raccourcis`, y compris
après une mise à jour iOS simulée. Les deux modes partagent les mêmes raccourcis.

Le mode Classique garde les actions standard. Le mode Apple Intelligence ajoute
un panneau d’entrée, des modèles dans la Galerie et les actions « Utiliser un
modèle », « Résumer le texte » et « Extraire les points clés ». La recherche et
les catégories du sélecteur permettent de retrouver les actions. Les actions
existantes sont modifiables, réordonnables et supprimables ; le résultat d’une
action texte alimente la suivante. Les résultats peuvent être masqués ou copiés.
Une action intelligente sauvegardée est conservée en mode Classique, mais son
exécution est bloquée avant les effets des autres actions de ce raccourci.

**Limite fonctionnelle explicite** : ces noms reproduisent une interface inspirée
d’Apple Intelligence ; le moteur Apple n’est pas présent dans ce site. Le résumé
est une extraction déterministe de deux phrases, les points clés sont une liste
de phrases et la transformation en majuscules est locale. Aucun texte n’est envoyé
à Apple, Private Cloud Compute ou ChatGPT. Les options distantes sont indisponibles.
Ce choix de version dans l’app est une fonction propre à ce simulateur web.

`node tests/shortcuts-modes.cjs` vérifie les deux modes, leurs réglages partagés,
les actions, l’édition, le blocage, la conservation après rechargement et après
installation simulée d’iOS 27 ; il génère vingt-trois captures de parcours distincts.
