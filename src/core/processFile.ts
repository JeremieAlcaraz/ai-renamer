import * as path from 'https://deno.land/std/path/mod.ts';

import isImage from '../utils/isImage.ts';
import isVideo from '../utils/isVideo.ts';
import saveFile from '../utils/saveFile.ts';
import getNewName from './getNewName.ts';
import extractFrames from '../utils/extractFrames.ts';
import readFileContent from '../utils/readFileContent.ts';
import deleteDirectory from '../utils/deleteDirectory.ts';
import isProcessableFile from '../utils/isProcessableFile.ts';

export default async (options: any) => {
  try {
    const { frames, filePath, inputPath } = options;

    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const relativeFilePath = path.relative(inputPath, filePath);

    if (fileName === '.DS_Store') return;

    if (!isProcessableFile({ filePath })) {
      console.log(`🟡 Unsupported file: ${relativeFilePath}`);
      return;
    }

    let content;
    let videoPrompt;
    let images: string[] = [];
    let framesOutputDir;
    if (isImage({ ext })) {
      images.push(filePath);
    } else if (isVideo({ ext })) {
      framesOutputDir = `/tmp/ai-renamer/${crypto.randomUUID()}`;
      const _extractedFrames = await extractFrames({
        frames,
        framesOutputDir,
        inputFile: filePath,
      });
      images = _extractedFrames.images;
      videoPrompt = _extractedFrames.videoPrompt;
    } else {
      content = await readFileContent({ filePath });
      if (!content) {
        console.log(`🔴 No text content: ${relativeFilePath}`);
        return;
      }
    }

    const newName = await getNewName({
      ...options,
      images,
      content,
      videoPrompt,
      relativeFilePath,
    });
    if (!newName) return;

    const newFileName = await saveFile({ ext, newName, filePath });
    if (newFileName) {
      const relativeNewFilePath = path.join(
        path.dirname(relativeFilePath),
        newFileName,
      );
      console.log(`🟢 Renamed: ${relativeFilePath} to ${relativeNewFilePath}`);
    }

    if (isVideo({ ext }) && framesOutputDir) {
      await deleteDirectory({ folderPath: framesOutputDir });
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};
