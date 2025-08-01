import yargs from 'https://deno.land/x/yargs@v17.7.2-deno/deno.ts';
import * as path from 'https://deno.land/std/path/mod.ts';

const CONFIG_FILE = path.join(Deno.env.get('HOME') || '', 'ai-renamer.json');

const loadConfig = async () => {
  try {
    const data = await Deno.readTextFile(CONFIG_FILE);
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return {};
    }
    throw err;
  }
};

const saveConfig = async ({ config }: { config: Record<string, unknown> }) => {
  await Deno.writeTextFile(CONFIG_FILE, JSON.stringify(config, null, 2));
};

export default async () => {
  const config = await loadConfig();

  const parser = yargs(Deno.args)
    .option('help', {
      alias: 'h',
      type: 'boolean',
      description: 'Show help',
    })
    .option('provider', {
      alias: 'p',
      type: 'string',
      description: 'Set the provider (e.g. ollama, openai, lm-studio)',
    })
    .option('api-key', {
      alias: 'a',
      type: 'string',
      description: "Set the API key if you're using openai as provider",
    })
    .option('base-url', {
      alias: 'u',
      type: 'string',
      description:
        'Set the API base URL (e.g. http://127.0.0.1:11434 for ollama)',
    })
    .option('model', {
      alias: 'm',
      type: 'string',
      description: 'Set the model to use (e.g. gemma2, llama3, gpt-4o)',
    })
    .option('frames', {
      alias: 'f',
      type: 'number',
      description:
        'Set the maximum number of frames to extract from videos (e.g. 3, 5, 10)',
    })
    .option('case', {
      alias: 'c',
      type: 'string',
      description:
        'Set the case style (e.g. camelCase, pascalCase, snakeCase, kebabCase)',
    })
    .option('chars', {
      alias: 'x',
      type: 'number',
      description:
        'Set the maximum number of characters in the new filename (e.g. 25)',
    })
    .option('language', {
      alias: 'l',
      type: 'string',
      description: 'Set the output language (e.g. English, Turkish)',
    })
    .option('include-subdirectories', {
      alias: 's',
      type: 'string',
      description:
        'Include files in subdirectories when processing (e.g: true, false)',
    })
    .option('custom-prompt', {
      alias: 'r',
      type: 'string',
      description:
        'Add a custom prompt to the LLM (e.g. "Only describe the background")',
    })
    .option('assistant-id', {
      alias: 'i',
      type: 'string',
      description: 'Set the OpenAI assistant ID to use',
    });

  const argv = parser.parse();

  if (argv.help) {
    parser.showHelp();
    Deno.exit(0);
  }

  if (argv.provider) {
    config.defaultProvider = argv.provider;
    await saveConfig({ config });
  }

  if (argv['api-key']) {
    config.defaultApiKey = argv['api-key'];
    await saveConfig({ config });
  }

  if (argv['base-url']) {
    config.defaultBaseURL = argv['base-url'];
    await saveConfig({ config });
  }

  if (argv.model) {
    config.defaultModel = argv.model;
    await saveConfig({ config });
  }

  if (argv.frames) {
    config.defaultFrames = argv.frames;
    await saveConfig({ config });
  }

  if (argv.case) {
    config.defaultCase = argv.case;
    await saveConfig({ config });
  }

  if (argv.chars) {
    config.defaultChars = argv.chars;
    await saveConfig({ config });
  }

  if (argv.language) {
    config.defaultLanguage = argv.language;
    await saveConfig({ config });
  }

  if (argv['include-subdirectories']) {
    config.defaultIncludeSubdirectories = argv['include-subdirectories'];
    await saveConfig({ config });
  }

  if (argv['custom-prompt']) {
    config.defaultCustomPrompt = argv['custom-prompt'];
    await saveConfig({ config });
  }

  if (argv['assistant-id']) {
    config.defaultAssistantId = argv['assistant-id'];
    await saveConfig({ config });
  }

  return { argv, config };
};
