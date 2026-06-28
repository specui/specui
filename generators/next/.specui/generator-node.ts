import { PrettierProcessor } from '@specui/prettier';
import { existsSync, readFileSync } from 'fs';

import generator from './generator';
// import { IconGenerator } from './generators/IconGenerator';
import { Spec } from './interfaces/Spec';

export default async function generatorNode(spec: Spec) {
  const packageJsonPath = `${process.cwd()}/package.json`;
  const pkg = existsSync(packageJsonPath)
    ? (JSON.parse(readFileSync(packageJsonPath, 'utf8')) as Record<string, unknown>)
    : {};

  return generator(
    spec,
    PrettierProcessor,
    // IconGenerator,
    pkg,
  );
}
