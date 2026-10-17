# Simulateur iPhone — version locale

Double-cliquez sur **Lancer.cmd** pour ouvrir la version à jour dans votre navigateur.
Vous pouvez aussi ouvrir directement **index.html**. Aucun serveur ni installation
supplémentaire n’est nécessaire. Les données enregistrées par le navigateur ne
sont pas supprimées par le nettoyage du projet.

## Fichiers de l’application

- `index.html` : téléphone, accueil et applications intégrées restantes.
- `systeme.js` : thème sombre et interactions communes.
- `applications/parametres.js` : écrans, styles et logique de Réglages.
- `applications/raccourcis.js` : Raccourcis reconstruit, styles et logique.
- `applications/raccourcis.html` : entrée HTML autonome de la même application.
- `applications/appareil-photo.js` : interface et logique de la caméra.
- `applications/photos.js` : photothèque, collections, lecture et favoris.
- `applications/wallet.js` : cartes fictives et gestion du portefeuille local.

Dans Raccourcis, **retour en haut à gauche > Réglages de Raccourcis** permet de choisir Classique ou
Apple Intelligence. Les actions intelligentes restent une démonstration locale,
sans moteur Apple ni ChatGPT. Les mises à jour iOS, comptes et réseaux sont simulés.

Le dossier `developpement` contient uniquement les tests, les scripts de capture
native et les rapports. Il n’est pas nécessaire pour ouvrir le simulateur.
Les anciennes captures et leurs preuves restent consultables dans l’historique
[GitHub](https://github.com/200012Yoel/-mulateur-iPhone-/tree/c0d8bdc/docs/ios-reference).

Pour lancer les tests depuis ce dossier : `node developpement/tests/settings.cjs`
avec Playwright et Chrome disponibles. Les images de test sont regroupées dans
`developpement/sorties`, ignoré par Git. Ce dossier peut être vidé après les tests.

## Raccourcis reconstruit

Ouvrez `applications/raccourcis.html` pour la version HTML autonome, ou Raccourcis
sur l’accueil du téléphone. Les données de chaque page locale dépendent du navigateur ;
exportez et importez une sauvegarde JSON pour les transférer entre les deux pages.

Bibliothèque avec recherche, dossiers, favoris, duplication et couleurs ; éditeur
avec réorganisation des actions ; galerie avec aperçu ; automatisations configurables
et test manuel ; réglages des modes Classique et Apple Intelligence ; import/export.
Les chaînes prennent en charge texte, saisie, calcul, date, attente annulable,
transformation de texte, ouverture d’apps et commandes Wi-Fi/économie d’énergie.
La version intégrée conserve les raccourcis précédents. Le profil visuel annoncé est
iPhone 17 Pro Max / iOS 27.1 ; ce programme HTML ne lance pas iOS.

Validation de la refonte : `node developpement/tests/shortcuts-rewrite.cjs`.


Le lancement principal reste **Lancer.cmd → index.html**. Touchez **Raccourcis**
sur l’accueil : la version 3.2 figure dans les réglages de Raccourcis.
Le profil iPhone 17 Pro Max / iOS 27.1 remplace automatiquement l’ancien profil,
y compris dans Informations et Mises à jour, sans effacer les données des apps.
Les références des scripts incluent un numéro de version pour renouveler leur cache.
La capture native demande iPhone 17 Pro Max / iOS 27.0 par défaut, conformément
à la version disponible et acceptée ; le profil HTML reste en 27.1. Toute version
exacte demandée est respectée : le script s’arrête si son runtime est absent.


## Références natives et REA — version 3.2

La bibliothèque suit les captures réelles iPhone 17 Pro Max / iOS 27.0 :
Sélectionner en haut, ajout flottant en bas, recherche et état vide centrés.
La surface de l’écran simulé mesure 440 × 956 points, hors cadre du téléphone.
Les dossiers, les automatisations, la galerie, les actions d’app et les réglages
sont accessibles depuis le bouton de retour en haut à gauche de la bibliothèque.
Le menu Réglages propose toujours les modes Classique et Apple Intelligence local.

Les captures et leur portée sont documentées dans
`developpement/docs/ios-reference/shortcuts/ios27-reference.md`.
Le scénario REA reproductible est `developpement/scripts/shortcuts-scenario.json` ;
`shortcuts-preview.py` ne sert que les deux fichiers publics de Raccourcis sur
127.0.0.1:8767, avec une erreur 404 pour tout autre chemin. Les preuves complètes
et images de travail restent dans `developpement/sorties`, ignoré par Git.
