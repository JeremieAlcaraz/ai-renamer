# Usage

This guide explains how to clone the repository, switch to the desired branch
and run the project locally.

## Clone the repository

```bash
git clone <repo-url>
cd ai-renamer
```

## Switch to the branch

If a branch named `test-deno` exists, you can check it out with:

```bash
git checkout test-deno
```

Otherwise you can create it based on the latest commit:

```bash
git checkout -b test-deno
```

## Run local checks

Install Deno and then execute the following commands:

```bash
deno fmt src
deno lint src
deno check src/core/index.ts
deno check src/**/*ts
deno test --allow-read --allow-write
```

Note: if `deno check` or `deno test` fail to download dependencies because of
certificate issues, ensure you have internet access and the proper certificates.

## Run the CLI

To test the CLI with mock data (using the provided unit tests):

```bash
deno test --allow-read --allow-write
```

To run the CLI with real data, provide a file or directory path. Example using
the default provider (Ollama):

```bash
deno run -A src/core/index.ts ./path/to/file
```

Set environment variables or use CLI options to configure another provider, API
keys, custom prompts, or an OpenAI assistant ID with `--assistant-id`.

