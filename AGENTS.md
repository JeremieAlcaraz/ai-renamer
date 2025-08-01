# AGENTS Instructions

These instructions apply to the entire repository.

## Workflow

1. Format, lint, and type-check the code before committing:
   ```bash
   deno fmt src
   deno lint src
   deno check src/core/index.ts
   deno check src/**/*ts
   deno test --allow-read --allow-write
   ```
   If `deno check` or `deno test` fail to download modules because of
   certificate issues, mention this in the PR.
2. Use TypeScript and Deno APIs. Avoid Node-specific modules except for npm
   packages already used in the project.
3. Keep commit messages short and descriptive.
