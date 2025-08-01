import { assertEquals } from 'https://deno.land/std@0.224.0/testing/asserts.ts';
import saveFile from './saveFile.ts';

Deno.test('saveFile renames file with unique name', async () => {
  const dir = await Deno.makeTempDir();
  const file = `${dir}/file.txt`;
  await Deno.writeTextFile(file, 'hello');

  const newName = await saveFile({
    ext: '.txt',
    newName: 'new',
    filePath: file,
  });
  const newPath = `${dir}/${newName}`;
  const stat = await Deno.stat(newPath);

  assertEquals(stat.isFile, true);
  await Deno.remove(dir, { recursive: true });
});
