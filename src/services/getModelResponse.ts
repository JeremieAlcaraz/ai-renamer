import { encodeBase64 } from 'https://deno.land/std/encoding/base64.ts';

const ollamaApis = async ({ model, prompt, images, baseURL }: any) => {
  try {
    const url = `${baseURL}/api/generate`;

    const data: any = {
      model,
      prompt,
      stream: false,
    };

    if (images && images.length > 0) {
      data.images = await Promise.all(images.map(async (imagePath: string) => {
        const imageData = await Deno.readFile(imagePath);
        return encodeBase64(imageData);
      }));
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result.error?.message || result.error || 'Failed to fetch from Ollama',
      );
    }

    return result.response;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const openaiAssistantApis = async (
  { assistantId, prompt, images, apiKey, baseURL }: any,
) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    };

    const threadRes = await fetch(`${baseURL}/v1/threads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });
    const thread = await threadRes.json();
    if (!threadRes.ok) {
      throw new Error(thread.error?.message || 'Failed to create thread');
    }

    const messages: any[] = [
      {
        role: 'user',
        content: [{ type: 'text', text: prompt }],
      },
    ];

    if (images && images.length > 0) {
      for (const imagePath of images) {
        const imageData = await Deno.readFile(imagePath);
        messages[0].content.push({
          type: 'image_url',
          image_url: {
            url: `data:image/jpeg;base64,${encodeBase64(imageData)}`,
          },
        });
      }
    }

    await fetch(`${baseURL}/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(messages[0]),
    });

    const runRes = await fetch(`${baseURL}/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ assistant_id: assistantId }),
    });
    const run = await runRes.json();
    if (!runRes.ok) {
      throw new Error(run.error?.message || 'Failed to start run');
    }

    let status = run.status;
    while (status !== 'completed') {
      await new Promise((r) => setTimeout(r, 1000));
      const statusRes = await fetch(
        `${baseURL}/v1/threads/${thread.id}/runs/${run.id}`,
        { headers },
      );
      const statusData = await statusRes.json();
      if (!statusRes.ok) {
        throw new Error(statusData.error?.message || 'Failed to poll run');
      }
      status = statusData.status;
      if (status === 'failed' || status === 'cancelled') {
        throw new Error(`Run ${status}`);
      }
    }

    const messagesRes = await fetch(
      `${baseURL}/v1/threads/${thread.id}/messages`,
      { headers },
    );
    const messagesData = await messagesRes.json();
    if (!messagesRes.ok) {
      throw new Error(messagesData.error?.message || 'Failed to get messages');
    }

    const assistantMessage = messagesData.data.find((m: any) =>
      m.role === 'assistant'
    );
    return assistantMessage?.content[0]?.text?.value || '';
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default async (options: any) => {
  try {
    const { provider } = options;

    if (provider === 'ollama') {
      return await ollamaApis(options);
    } else if (provider === 'openai' || provider === 'lm-studio') {
      return await openaiAssistantApis(options);
    } else {
      throw new Error('🔴 No supported provider found');
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
