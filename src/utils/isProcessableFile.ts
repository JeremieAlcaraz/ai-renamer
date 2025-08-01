import * as path from 'https://deno.land/std/path/mod.ts';
import supportedExtensions from './supportedExtensions.ts';

export default ({ filePath }: { filePath: string }) => {
  const ext = path.extname(filePath).toLowerCase();
  return supportedExtensions.includes(ext);
};
