import { PrettierProcessor } from '@specui/prettier/dist/standalone';
import { PrettierRustProcessor } from '@specui/prettier-rust/dist/standalone';

import { Spec } from './interfaces/Spec';
import generator from './generator';
// import { IconGeneratorBrowser } from './generators/IconGeneratorBrowser';

export default async function generatorBrowser(spec: Spec) {
  return generator(
    spec,
    PrettierProcessor,
    // IconGeneratorBrowser
  );
}
