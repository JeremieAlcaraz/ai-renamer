# Fiche Projet : AI Renamer

## Description

Ce projet est un outil en ligne de commande (CLI) qui utilise l'intelligence artificielle pour renommer intelligemment des fichiers et des dossiers. L'objectif est de migrer une base de code existante de Node.js/JavaScript vers Deno/TypeScript tout en améliorant sa structure et sa maintenabilité.

## Stack Technique

### Actuelle
- **Runtime**: Node.js
- **Langage**: JavaScript (ESM)
- **Dépendances**: `yargs`, `openai` (API dépréciée)
- **Structure**: Plate, tous les fichiers dans `src/`.

### Cible
- **Runtime**: Deno
- **Langage**: TypeScript
- **API IA**: API OpenAI moderne (Chat Completions)
- **Structure**: Modulaire et organisée (ex: `src/utils`, `src/services`, `src/core`).

## Objectifs Clés

1.  **Améliorer la Structure**: Refactoriser le code JS existant pour une meilleure lisibilité et modularité avant la migration.
2.  **Migrer vers Deno/TypeScript**: Remplacer Node.js par Deno, convertir le JavaScript en TypeScript et utiliser les API natives de Deno.
3.  **Mettre à jour l'API OpenAI**: Remplacer l'appel à l'API dépréciée par une implémentation moderne.
4.  **Mettre en place des Tests**: Assurer la robustesse de l'application à chaque étape.

## Guideline Importante

Chaque étape majeure de la migration doit être validée par des tests fonctionnels pour s'assurer que l'application reste stable et fonctionnelle, permettant des commits atomiques et sécurisés.
