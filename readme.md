# AI Renamer

This project is a command-line interface (CLI) tool that uses artificial intelligence to intelligently rename files and directories. This fork's primary goal is to migrate the original Node.js/JavaScript codebase to Deno/TypeScript while improving its structure, maintainability, and overall quality.

A Node.js CLI that uses Ollama and LM Studio models (Llava, Gemma, Llama etc.) to intelligently rename files by their contents

[![npm](https://img.shields.io/npm/v/ai-renamer.svg?style=flat-square)](https://www.npmjs.com/package/ai-renamer)
[![license](https://img.shields.io/npm/l/ai-renamer?style=flat-square)](https://github.com/ozgrozer/ai-renamer/blob/main/license)

## Preview

Rename videos

<https://github.com/user-attachments/assets/502aedba-044e-4ed5-a1c7-bca84af2f3ce>

Rename images

<https://github.com/ozgrozer/ai-renamer/assets/651938/0d229179-8385-4f17-a9fb-44d40c79d1e9>

Rename files

<https://github.com/user-attachments/assets/f8b37c3a-9cc0-48fc-aaea-f25f7b6ee4cc>

## Usage

You need to have [Ollama](https://ollama.com/download) or [LM Studio](https://lmstudio.ai/) and at least one LLM (Llava, Gemma, Llama etc.) installed on your system. You need to have [ffmpeg](https://www.ffmpeg.org/download.html) to rename videos.

## Ollama Usage

Ollama is the default provider so you don't have to do anything. You can just run `npx ai-renamer /images`. At the first launch it will try to auto-select the Llava model but if it couldn't do that you can specify the model.

```bash
npx ai-renamer /path --provider=ollama --model=llava:13b
```

## LM Studio Usage

You need to set the provider as `lm-studio` and it will auto-select the loaded model in LM Studio.

```bash
npx ai-renamer /path --provider=lm-studio
```

## OpenAI Usage

You need to set the provider as `openai` and the api-key with your API key and it will auto-select the gpt-4o model. But you can assign any model with `--model` flag.

```bash
npx ai-renamer /path --provider=openai --api-key=OPENAI_API_KEY
```

## Custom Ports

If you're using a different port in Ollama or LM Studio you could simply specify the base URLs.

```bash
npx ai-renamer /path --provider=ollama --base-url=http://127.0.0.1:11434
npx ai-renamer /path --provider=lm-studio --base-url=http://127.0.0.1:1234
```

## Params

The values of the flags will be saved to your disk when you use them. You can find the config file at `~/ai-renamer.json`. If you're using a Mac it's `/Users/your-user-name/ai-renamer.json`. Also when you set a flag you don't have to use them again. The script gets the values from this config file.

```bash
npx ai-renamer --help
Options:
  -h, --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -p, --provider                Set the provider (e.g. ollama, openai,
                                lm-studio)                              [string]
  -a, --api-key                 Set the API key if you're using openai as
                                provider                                [string]
  -u, --base-url                Set the API base URL (e.g.
                                http://127.0.0.1:11434 for ollama)      [string]
  -m, --model                   Set the model to use (e.g. gemma2, llama3,
                                gpt-4o)                                 [string]
  -f, --frames                  Set the maximum number of frames to extract from
                                videos (e.g. 3, 5, 10)                  [number]
  -c, --case                    Set the case style (e.g. camelCase, pascalCase,
                                snakeCase, kebabCase)                   [string]
  -x, --chars                   Set the maximum number of characters in the new
                                filename (e.g. 25)                      [number]
  -l, --language                Set the output language (e.g. English, Turkish)
                                                                        [string]
  -s, --include-subdirectories  Include files in subdirectories when processing
                                (e.g: true, false)                      [string]
  -r, --custom-prompt           Add a custom prompt to the LLM (e.g. "Only
                                describe the background")               [string]
```

`ai-renamer` uses `change-case` library for case styling

```bash
# value: result
camelCase: twoWords
capitalCase: Two Words
constantCase: TWO_WORDS
dotCase: two.words
kebabCase: two-words
noCase: two words
pascalCase: TwoWords
pascalSnakeCase: Two_Words
pathCase: two/words
sentenceCase: Two words
snakeCase: two_words
trainCase: Two-Words
```

## Contribution

Feel free to contribute. Open a new [issue](https://github.com/ozgrozer/ai-renamer/issues), or make a [pull request](https://github.com/ozgrozer/ai-renamer/pulls).

## License

[GPL-3.0](https://github.com/ozgrozer/ai-renamer/blob/main/license)

## Project Goals

The main objectives of this migration are:

1. **Modernize the Tech Stack:** Move from Node.js to Deno and from JavaScript to TypeScript to leverage modern features, type safety, and a more secure runtime.
2. **Improve Code Quality:** Refactor the codebase to be more modular, readable, and maintainable. This includes organizing the code into a clear directory structure (e.g., `src/utils`, `src/services`, `src/core`).
3. **Update OpenAI Integration:** Replace the deprecated OpenAI API with the current and more robust version.
4. **Ensure Stability:** Implement a testing strategy to validate each step of the migration, ensuring that the application remains functional and stable throughout the process.

## Original Project

For more information about the original project, please see the [original repository](https://github.com/ozgrozer/ai-renamer).

## Migration Plan

The migration will be carried out in several logical steps, with each step being validated to ensure that the application remains in a working state. This approach allows for incremental changes and easier debugging.

### Step 1: Code Refactoring and Structuring

- [x] Organize existing JavaScript code into a more modular structure.
- [ ] Improve code readability and maintainability.
- [ ] Validate this step by running the existing test suite (if any) or by manual testing.

### Step 2: Migration to Deno and TypeScript

- [ ] Set up the Deno environment.
- [ ] Convert JavaScript files to TypeScript.
- [ ] Replace Node.js-specific APIs with Deno equivalents.
- [ ] Validate this step by ensuring the application runs correctly in the Deno environment.

### Step 3: OpenAI API Update

- [ ] Replace the deprecated OpenAI API calls with the new API.
- [ ] Test the new implementation to ensure it works as expected.

### Step 4: Final Touches and Testing

- [ ] Review the entire codebase for any remaining issues.
- [ ] Add or improve tests to ensure the application is robust.
- [ ] Update the documentation to reflect the changes.

## Contribution

Contributions are welcome! Please open an issue to discuss your ideas or submit a pull request.

## License

[GPL-3.0](https://github.com/ozgrozer/ai-renamer/blob/main/license)
