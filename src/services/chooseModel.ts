const ollamaApis = async ({ baseURL }: { baseURL: string }) => {
  try {
    const response = await fetch(`${baseURL}/api/tags`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch models from Ollama');
    }
    return data.models;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const lmStudioApis = async ({ baseURL }: { baseURL: string }) => {
  try {
    const response = await fetch(`${baseURL}/v1/models`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch models from LM Studio');
    }
    return data.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const listModels = async (options: any) => {
  try {
    const { provider } = options;

    if (provider === 'ollama') {
      return await ollamaApis(options);
    } else if (provider === 'lm-studio') {
      return await lmStudioApis(options);
    } else if (provider === 'openai') {
      return [
        { name: 'gpt-4o' },
        { name: 'gpt-4' },
        { name: 'gpt-3.5-turbo' },
      ];
    } else {
      throw new Error('🔴 No supported provider found');
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const filterModelNames = (arr: any[]) => {
  return arr.map((item) => {
    if (item.id !== undefined) {
      return { name: item.id };
    } else if (item.name !== undefined) {
      return { name: item.name };
    } else {
      throw new Error('Item does not contain id or name property');
    }
  });
};

const chooseModel = ({ models }: { models: { name: string }[] }) => {
  const preferredModels = [
    'llava',
    'llama',
    'gemma',
    'phi',
    'qwen',
    'aya',
    'mistral',
    'mixtral',
    'deepseek-coder',
  ];

  for (const modelName of preferredModels) {
    if (models.some((model) => model.name.toLowerCase().includes(modelName))) {
      return models.find((model) =>
        model.name.toLowerCase().includes(modelName)
      )?.name;
    }
  }

  return models.length > 0 ? models[0].name : null;
};

export default async (options: any) => {
  try {
    const _models = await listModels(options);
    const models = filterModelNames(_models);
    console.log(`⚪ Available models: ${models.map((m) => m.name).join(', ')}`);

    const model = await chooseModel({ models });
    if (!model) throw new Error('🔴 No suitable model found');

    return model;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
