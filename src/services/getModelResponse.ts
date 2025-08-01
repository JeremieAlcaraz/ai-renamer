import { Buffer } from 'https://deno.land/std/io/buffer.ts';

const ollamaApis = async ({ model, prompt, images, baseURL }: any) => {
  try {
    const url = `${baseURL}/api/generate`

    const data: any = {
      model,
      prompt,
      stream: false
    }

    if (images && images.length > 0) {
      data.images = await Promise.all(images.map(async (imagePath: string) => {
        const imageData = await Deno.readFile(imagePath)
        return new Buffer(imageData).toString('base64')
      }))
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error?.message || result.error || 'Failed to fetch from Ollama')
    }

    return result.response
  } catch (err) {
    throw new Error(err.message)
  }
}

const openaiApis = async ({ model, prompt, images, apiKey, baseURL }: any) => {
  try {
    const url = `${baseURL}/v1/chat/completions`

    const data: any = {
      model,
      stream: false
    }

    const messages: any[] = [{
      role: 'user',
      content: [
        { type: 'text', text: prompt }
      ]
    }]

    if (images && images.length > 0) {
      for (const imagePath of images) {
        const imageData = await Deno.readFile(imagePath)
        messages[0].content.push({
          type: 'image_url',
          image_url: { url: `data:image/jpeg;base64,${new Buffer(imageData).toString('base64')}` }
        })
      }
    }

    data.messages = messages

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` })
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error?.message || result.error || 'Failed to fetch from OpenAI')
    }

    return result.choices[0].message.content
  } catch (err) {
    throw new Error(err.message)
  }
}

export default async (options: any) => {
  try {
    const { provider } = options

    if (provider === 'ollama') {
      return ollamaApis(options)
    } else if (provider === 'openai' || provider === 'lm-studio') {
      return openaiApis(options)
    } else {
      throw new Error('🔴 No supported provider found')
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
