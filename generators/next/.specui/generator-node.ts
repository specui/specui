import { PrettierProcessor } from '@specui/prettier';
import { existsSync } from 'fs';

import generator from './generator';
import { Spec } from './interfaces/Spec';

export default async function generatorNode(spec: Spec) {
  return generator(spec, PrettierProcessor, existsSync);
}
