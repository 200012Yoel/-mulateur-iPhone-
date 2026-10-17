# Raccourcis : deux modes

Le choix se trouve dans **Raccourcis > ⚙ > Version de Raccourcis**, et dans
**Réglages > Apps > Raccourcis > Version de Raccourcis**. Il est propre à cette
reconstruction web ; il ne s’agit pas d’un sélecteur de versions natif d’Apple.

| Mode | Actions | Raccourcis enregistrés |
| --- | --- | --- |
| Classique | Apps, texte, Wi-Fi, économie d’énergie | Conservés, y compris les actions intelligentes devenues indisponibles |
| Apple Intelligence | Actions standard et actions de texte de démonstration | Même bibliothèque, mêmes données |

La recherche d’actions possède les catégories Toutes, Apps et Apple Intelligence.
La Galerie propose trois exemples standard, et trois exemples supplémentaires
dans le mode Apple Intelligence. Les actions peuvent être modifiées, réordonnées,
retirées et exécutées ; une action texte peut fournir son résultat à la suivante.
Un raccourci avec action intelligente est bloqué avant tout effet quand le mode
Classique est sélectionné.

Les actions de cette démo utilisent une extraction de phrases, une mise en liste
et une transformation en majuscules. Aucun moteur Apple Intelligence, Private
Cloud Compute ou ChatGPT n’est exécuté ; les modèles distants sont indisponibles.
Les intitulés s’inspirent des fonctions documentées par
[Apple pour iOS 26](https://support.apple.com/fr-fr/123075), sans en reproduire le moteur.

## Captures de la reconstruction

[Galerie des 23 captures locales](https://github.com/200012Yoel/-mulateur-iPhone-/tree/c0d8bdc4c9278697005d63778e62b4f1b6e36091/docs/ios-reference/shortcuts/local/). Ces images sont issues des
tests de la reconstruction ; elles ne sont pas des captures natives Apple.
Le script `developpement/tests/shortcuts-modes.cjs` crée un manifeste des fichiers réellement
produits, pour éviter de compter d’anciennes images comme de nouvelles captures.
Il vérifie les deux modes, les paramètres partagés, l’édition et l’exécution,
la recherche d’actions, les modèles de la Galerie, le blocage avant modification
du Wi-Fi, la préférence d’affichage des résultats et la conservation après
rechargement et mise à jour simulée d’iOS 27.

Les versions sont de simples préférences locales : une mise à jour simulée iOS
ne les réinitialise pas et ne supprime pas les raccourcis.


## Captures natives supplémentaires

[Session GitHub Actions du 17 octobre 2026](https://github.com/200012Yoel/-mulateur-iPhone-/actions/runs/39066343756),
iPhone 16 Pro Max, iOS 26.2 build 23C54, mode sombre : **3 tests, 1 réussi,
2 ignorés, aucune erreur**. Le scope `shortcuts` a produit **15 captures PNG**,
dont deux diagnostics de menus non trouvés. Les **13 écrans utiles** sont dans la
[galerie native](https://github.com/200012Yoel/-mulateur-iPhone-/tree/c0d8bdc4c9278697005d63778e62b4f1b6e36091/docs/ios-reference/shortcuts/native/) : bibliothèque, recherche, éditeur vide,
recherches d’actions, Automatisation et Galerie avec leurs parties inférieures.

La page Apple Intelligence et le menu de mise à jour n’ont pas été trouvés par
les tests de cette session. Les recherches Texte, Utiliser un modèle, Résumer,
Apple Intelligence et Wi-Fi affichent des listes vides dans les captures :
cela ne permet pas de valider une exécution native d’Apple Intelligence, ni
l’intégralité du catalogue d’actions. Aucune capture d’un modèle Apple actif
n’a été obtenue. Le mode local avec Apple Intelligence est donc inspiré de la
documentation Apple ; il n’est pas présenté comme une session native validée.

L’éditeur vide du simulateur a été ajusté après inspection de ces captures :
instructions centrales, panneau inférieur arrondi, barre de recherche et
catégories. Le choix entre les deux versions reste une fonction propre au site.
Les paramètres et les données sont aussi conservés lors d’une mise à jour ou
d’un changement de nom de l’app dans le registre partagé.
