require('ts-node/register');

import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';

import * as pkg from '../package.json';

program.version(pkg.version);

program.command('generate').action(async () => {
  // load zapp project
  const files = await require(`${process.cwd()}/.zapp/zapp`).default;

  console.log('Generated Files:');

  Object.keys(files)
    .sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
    .forEach(async (fileName) => {
      const fileContents = await files[fileName];
      const filePath = path.normalize(fileName);
      const dirName = path.dirname(filePath);

      if (typeof fileContents !== 'string') {
        console.log(`- ${filePath} (skipped)`);
        return;
      }

      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }
      fs.writeFileSync(filePath, fileContents);

      console.log(`- ${filePath}`);
    });
});

program.parse(process.argv);
