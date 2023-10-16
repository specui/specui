require('ts-node/register');

import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, normalize } from 'path';
import { program } from 'commander';
import { loadZappFile } from './utils/loadZappFile';

program.name('@zappjs/cli').description('continuous code generation ⚡️').version('2.0.0');

program.command('generate').action(async () => {
  const zappFile = loadZappFile();

  console.log('Generated Files:');

  Object.entries(zappFile).forEach(async ([fileName, generator]) => {
    const fileContents = await generator;
    const filePath = normalize(fileName);
    const dirName = dirname(filePath);

    if (typeof fileContents !== 'string') {
      console.log(`- ${filePath} (skipped)`);
      return;
    }

    if (!existsSync(dirName)) {
      await mkdir(dirName, { recursive: true });
    }
    await writeFile(filePath, fileContents);

    console.log(`- ${filePath}`);
  });
});

program.parse();
