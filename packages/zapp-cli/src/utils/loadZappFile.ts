import { existsSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { parse } from 'yaml';

export const loadZappFile = async () => {
  const zappDir = join(process.cwd(), '.zapp');

  const possibleFiles = ['spec.yaml', 'spec.yml', 'spec.json', 'zapp.js', 'zapp.ts'];

  for (const file of possibleFiles) {
    const filePath = join(zappDir, file);

    if (existsSync(filePath)) {
      const extension = extname(filePath);
      switch (extension) {
        case '.yaml':
        case '.yml':
          const zapp = require(join(zappDir, 'zapp')).default;
          return await zapp(parse(readFileSync(filePath, 'utf8')));

        case '.json':
          return JSON.parse(readFileSync(filePath, 'utf8'));

        case '.js':
        case '.ts':
          return require(filePath).default;

        default:
          throw new Error(`Unsupported zapp format: ${extension}`);
      }
    }
  }

  throw new Error('No zapp file found.');
};
