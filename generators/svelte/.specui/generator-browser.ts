import { PrettierProcessor } from '@specui/prettier/dist/standalone';

import { Spec } from './interfaces/Spec';
import generator from './generator';

export default async function generatorBrowser(spec: Spec) {
  return generator(spec, PrettierProcessor);
}
