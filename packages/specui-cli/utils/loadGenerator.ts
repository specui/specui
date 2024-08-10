import nextGenerator from '@specui/next-generator';
import vanillaGenerator from '@specui/vanilla-generator';
import { existsSync } from 'fs';
import { join } from 'path';

export const loadGenerator = async (dir = process.cwd()) => {
  if (dir === '@specui/next-generator') {
    return nextGenerator;
  }

  if (dir === '@specui/vanilla-generator') {
    return vanillaGenerator;
  }

  const specUiDir = join(dir, '.specui');

  const possibleFiles = ['generator-node.js', 'generator-node.ts'];

  for (const file of possibleFiles) {
    const filePath = join(specUiDir, file);

    if (existsSync(filePath)) {
      return require(filePath).default;
    }
  }

  throw new Error('No generator found.');
};
