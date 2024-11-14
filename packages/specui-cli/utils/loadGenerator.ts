import drizzleGenerator from '@specui/drizzle-generator';
import nextGenerator from '@specui/next-generator/dist/generator-node';
import remotionGenerator from '@specui/remotion-generator';
import svelteGenerator from '@specui/svelte-generator';
import { existsSync } from 'fs';
import { join } from 'path';

export const loadGenerator = async (dir = process.cwd(), spec?: any) => {
  if (dir === '@specui/drizzle-generator') {
    return drizzleGenerator;
  }

  if (dir === '@specui/next-generator') {
    return nextGenerator;
  }

  if (dir === '@specui/remotion-generator') {
    return remotionGenerator;
  }

  if (dir === '@specui/svelte-generator') {
    return svelteGenerator;
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
