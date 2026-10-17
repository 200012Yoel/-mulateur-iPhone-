# Simulateur iPhone — version locale

Double-cliquez sur **Lancer.cmd** pour ouvrir la version à jour dans votre navigateur.
Vous pouvez aussi ouvrir directement **index.html**. Aucun serveur ni installation
supplémentaire n’est nécessaire. Les données enregistrées par le navigateur ne
sont pas supprimées par le nettoyage du projet.

## Fichiers de l’application

- `index.html` : téléphone, accueil et applications intégrées restantes.
- `systeme.js` : thème sombre et interactions communes.
- `applications/parametres.js` : écrans, styles et logique de Réglages.
- `applications/raccourcis.js` : Raccourcis, ses styles et ses deux modes.
- `applications/appareil-photo.js` : interface et logique de la caméra.
- `applications/photos.js` : photothèque, collections, lecture et favoris.
- `applications/wallet.js` : cartes fictives et gestion du portefeuille local.

Dans Raccourcis, **⚙ > Version de Raccourcis** permet de choisir Classique ou
Apple Intelligence. Les actions intelligentes restent une démonstration locale,
sans moteur Apple ni ChatGPT. Les mises à jour iOS, comptes et réseaux sont simulés.

Le dossier `developpement` contient uniquement les tests, les scripts de capture
native et les rapports. Il n’est pas nécessaire pour ouvrir le simulateur.
Les anciennes captures et leurs preuves restent consultables dans l’historique
[GitHub](https://github.com/200012Yoel/-mulateur-iPhone-/tree/c0d8bdc/docs/ios-reference).

Pour lancer les tests depuis ce dossier : `node developpement/tests/settings.cjs`
avec Playwright et Chrome disponibles. Les images de test sont regroupées dans
`developpement/sorties`, ignoré par Git. Ce dossier peut être vidé après les tests.
