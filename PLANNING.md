## Plan de Migration : AI Renamer vers Deno/TypeScript

### Étape 1 : Amélioration de la Structure et de la Lisibilité (JavaScript)

L'objectif de cette première étape est de refactoriser la base de code JavaScript existante pour la rendre plus modulaire, lisible et maintenable. Cela facilitera grandement la migration ultérieure vers TypeScript et Deno.

**Tâches :**

1.  **Créer une structure de dossiers :**
    [x]    `src/utils` : Pour les fonctions utilitaires (ex: `changeCase.js`, `isImage.js`, `isVideo.js`, `supportedExtensions.js`).
    *   `src/core` : Pour la logique métier principale (ex: `processFile.js`, `processDirectory.js`, `getNewName.js`).
    *   `src/services` : Pour les services externes (ex: `getModelResponse.js`).
    *   `src/config` : Pour la configuration (ex: `configureYargs.js`).
2.  **Déplacer les fichiers existants** dans la nouvelle structure de dossiers.
3.  **Mettre à jour les imports/exports** pour refléter la nouvelle structure.
4.  **Revue de code :** Améliorer la lisibilité, ajouter des commentaires si nécessaire, et s'assurer que le code suit des conventions de style cohérentes.

**Validation :**

*   **Tests manuels :** Exécutez l'application avec différentes options pour vous assurer que tout fonctionne comme avant.
    *   `npx ai-renamer /chemin --provider=ollama`
    *   `npx ai-renamer /chemin --provider=lm-studio`
    *   `npx ai-renamer /chemin --provider=openai --api-key=VOTRE_CLE_API`
*   **Tests automatisés (si possible) :** Si des tests existent, exécutez-les. Sinon, c'est le bon moment pour en ajouter quelques-uns pour les fonctionnalités critiques.

### Étape 2 : Migration vers Deno et TypeScript

Une fois que la base de code est bien structurée, nous pouvons commencer la migration vers Deno et TypeScript.

**Tâches :**

1.  **Mettre en place l'environnement Deno :**
    *   Créer un fichier `deno.json` pour la configuration du projet (imports, etc.).
2.  **Convertir les fichiers JavaScript en TypeScript :**
    *   Renommer les fichiers `.js` en `.ts`.
    *   Ajouter des types aux variables, paramètres de fonction et valeurs de retour.
    *   Utiliser les fonctionnalités de TypeScript pour améliorer la robustesse du code.
3.  **Remplacer les API Node.js par des API Deno :**
    *   Remplacer `require` et `module.exports` par `import` et `export`.
    *   Remplacer les modules Node.js (ex: `fs`, `path`) par leurs équivalents Deno (ex: `Deno`, `std/path`).
4.  **Gérer les dépendances :**
    *   Importer les dépendances directement depuis leur URL dans les fichiers TypeScript.

**Validation :**

*   **Compilation :** Assurez-vous que le code compile sans erreur avec `deno check`.
*   **Tests fonctionnels :** Exécutez l'application avec les mêmes commandes que dans l'étape 1, mais en utilisant Deno.
    *   `deno run -A src/index.ts /chemin --provider=ollama`
    *   `deno run -A src/index.ts /chemin --provider=lm-studio`
    *   `deno run -A src/index.ts /chemin --provider=openai --api-key=VOTRE_CLE_API`

### Étape 3 : Mise à Jour de l'API OpenAI

Maintenant que l'application fonctionne sous Deno et TypeScript, nous pouvons mettre à jour l'appel à l'API OpenAI.

**Tâches :**

1.  **Identifier le code de l'API OpenAI dépréciée.**
2.  **Remplacer l'implémentation** par la nouvelle API "Chat Completions".
3.  **Tester la nouvelle implémentation** pour s'assurer qu'elle fonctionne correctement.

**Validation :**

*   **Tests unitaires :** Créez un test unitaire pour la fonction qui appelle l'API OpenAI.
*   **Tests d'intégration :** Exécutez l'application avec l'option `--provider=openai` et vérifiez que le renommage fonctionne comme prévu.

### Étape 4 : Finalisation et Tests

Cette dernière étape consiste à peaufiner l'application et à s'assurer qu'elle est robuste et bien documentée.

**Tâches :**

1.  **Revue complète du code :** Relisez l'ensemble du code pour vous assurer de sa cohérence et de sa qualité.
2.  **Améliorer les tests :** Ajoutez des tests unitaires et d'intégration pour couvrir les cas d'utilisation les plus importants.
3.  **Mettre à jour la documentation :** Mettez à jour le `README.md` et les autres documents pour refléter les changements.

**Validation :**

*   **Exécuter tous les tests :** `deno test`.
*   **Validation manuelle :** Effectuez une dernière série de tests manuels pour vous assurer que tout est parfait.
