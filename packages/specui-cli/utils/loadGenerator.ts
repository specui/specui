import { existsSync } from 'fs';
import { join } from 'path';

export const loadGenerator = async (dir = process.cwd()) => {
  const zappDir = join(dir, '.specui');

  const possibleFiles = ['generator-node.js', 'generator-node.ts'];

  for (const file of possibleFiles) {
    const filePath = join(zappDir, file);

    if (existsSync(filePath)) {
      return require(filePath).default;
    }
  }

  throw new Error('No generator found.');
};
