import { PrettierProcessor } from '@specui/prettier/dist/standalone';

import { ISpec } from './interfaces/ISpec';
import generator from './generator';

export default async function generatorBrowser(spec: ISpec) {
  return generator(spec, PrettierProcessor);
}
