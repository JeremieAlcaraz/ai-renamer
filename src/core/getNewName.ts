import changeCase from '../utils/changeCase.ts';
import getModelResponse from '../services/getModelResponse.ts';

export default async (options: any) => {
  const {
    _case,
    chars,
    content,
    language,
    videoPrompt,
    customPrompt,
    relativeFilePath,
  } = options;

  try {
    const promptLines = [
      'Generate filename:',
      '',
      `Use ${_case}`,
      `Max ${chars} characters`,
      `${language} only`,
      'No file extension',
      'No special chars',
      'Only key elements',
      'One word if possible',
      'Noun-verb format',
      '',
      'Respond ONLY with filename.',
    ];

    if (videoPrompt) {
      promptLines.unshift(videoPrompt, '');
    }

    if (content) {
      promptLines.push('', 'Content:', content);
    }

    if (customPrompt) {
      promptLines.push('', 'Custom instructions:', customPrompt);
    }

    const prompt = promptLines.join('\n');

    const modelResult = await getModelResponse({ ...options, prompt });

    const maxChars = chars + 10;
    const text = modelResult.trim().slice(-maxChars);
    const filename = await changeCase({ text, _case });
    return filename;
  } catch (err) {
    console.log(
      `🔴 Model error: ${(err as Error).message} (${relativeFilePath})`,
    );
  }
};
