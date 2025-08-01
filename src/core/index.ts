#!/usr/bin/env -S deno run -A

import processPath from './processPath.ts';
import configureYargs from '../config/configureYargs.ts';

const main = async () => {
  try {
    const { argv, config } = await configureYargs();
    const [inputPath] = argv._ as string[];

    if (!inputPath) {
      console.log('🔴 Please provide a file or folder path');
      Deno.exit(1);
    }

    await processPath({ ...config, inputPath });
  } catch (err) {
    console.log((err as Error).message);
  }
};

main();
