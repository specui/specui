import { PrettierProcessor } from '@specui/prettier';
import { existsSync } from 'fs';

import generator from './generator';
import { ISpec } from './interfaces/ISpec';

export default async function generatorBrowser(spec: ISpec) {
  return generator(spec, PrettierProcessor, existsSync);
}
