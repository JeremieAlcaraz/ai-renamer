import * as path from 'https://deno.land/std/path/mod.ts';

export default async ({
  ext,
  newName,
  filePath,
}: {
  ext: string;
  newName: string;
  filePath: string;
}): Promise<string | undefined> => {
  try {
    const dir = path.dirname(filePath);
    let newFileName = newName + ext;
    let newPath = path.join(dir, newFileName);
    let counter = 1;

    while (true) {
      try {
        await Deno.stat(newPath);
        newFileName = `${newName}${counter}${ext}`;
        newPath = path.join(dir, newFileName);
        counter++;
      } catch (_err) {
        break;
      }
    }

    await Deno.rename(filePath, newPath);
    return newFileName;
  } catch (err) {
    console.log((err as Error).message);
  }
};
