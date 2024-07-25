import { existsSync } from 'fs';
import { join } from 'path';

export const loadZappFile = async (dir = process.cwd()) => {
  const zappDir = join(dir, '.zapp');

  const possibleFiles = ['zapp.js', 'zapp.ts'];

  for (const file of possibleFiles) {
    const filePath = join(zappDir, file);

    if (existsSync(filePath)) {
      return require(filePath).default;
    }
  }

  throw new Error('No zapp file found.');
};
