import * as path from 'https://deno.land/std/path/mod.ts';
// @deno-types="npm:@types/pdf-parse@1.1.5"
import pdf from 'npm:pdf-parse';
import { Buffer } from 'node:buffer';

export default async ({ filePath }: { filePath: string }): Promise<string> => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    let content = '';
    if (ext === '.pdf') {
      const dataBuffer = await Deno.readFile(filePath);
      const pdfData = await pdf(Buffer.from(dataBuffer));
      content = pdfData.text.trim();
    } else {
      content = await Deno.readTextFile(filePath);
    }

    return content;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
