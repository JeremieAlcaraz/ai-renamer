import * as path from 'https://deno.land/std/path/mod.ts';
import processFile from './processFile.ts';

const processDirectory = async ({ options, inputPath }: any) => {
  try {
    for await (const dirEntry of Deno.readDir(inputPath)) {
      const filePath = path.join(inputPath, dirEntry.name);
      if (dirEntry.isFile) {
        await processFile({ ...options, filePath });
      } else if (dirEntry.isDirectory && options.includeSubdirectories) {
        await processDirectory({ options, inputPath: filePath });
      }
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

export default processDirectory;
