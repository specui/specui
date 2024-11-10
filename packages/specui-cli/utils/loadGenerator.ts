import drizzleGenerator from '@specui/drizzle-generator';
import nextGenerator from '@specui/next-generator/dist/generator-node';
import { existsSync, readdirSync, statSync } from 'fs';
import { join, extname, relative, resolve } from 'path';

export const loadGenerator = async (dir = process.cwd(), spec?: any) => {
  if (dir === '@specui/drizzle-generator') {
    return drizzleGenerator;
  }

  if (dir === '@specui/next-generator') {
    return nextGenerator;
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
