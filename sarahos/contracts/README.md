# SarahOS contracts

Ce dossier contient les contrats purs Kotlin examinables avant leur port dans
un checkout AOSP sous `packages/modules/SarahActions`.

`SarahActionContract` définit une liste blanche d'actions, les arguments
acceptés et une validation locale. Il ne contient ni accès root, ni shell, ni
appel Android direct. Lors de l'intégration, le service AIDL ajoutera la
vérification de signature, des permissions, du consentement et des politiques
par utilisateur avant de déléguer aux APIs Android.
