import { PrettierProcessor } from '@specui/prettier';
import { existsSync } from 'fs';

import generator from './generator';
import { IconGenerator } from './generators/IconGenerator';
import { Spec } from './interfaces/Spec';

export default async function generatorNode(spec: Spec) {
  return generator(spec, PrettierProcessor, IconGenerator, existsSync);
}
