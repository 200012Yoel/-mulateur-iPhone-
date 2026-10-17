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

[Galerie des 23 captures locales](local/index.html). Ces images sont issues des
tests de la reconstruction ; elles ne sont pas des captures natives Apple.
Le script `tests/shortcuts-modes.cjs` crée un manifeste des fichiers réellement
produits, pour éviter de compter d’anciennes images comme de nouvelles captures.
Il vérifie les deux modes, les paramètres partagés, l’édition et l’exécution,
la recherche d’actions, les modèles de la Galerie, le blocage avant modification
du Wi-Fi, la préférence d’affichage des résultats et la conservation après
rechargement et mise à jour simulée d’iOS 27.

Les versions sont de simples préférences locales : une mise à jour simulée iOS
ne les réinitialise pas et ne supprime pas les raccourcis.
