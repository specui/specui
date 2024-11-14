import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

import { Spec } from '../interfaces/Spec';

export default async function PostcssConfigFile(spec: Spec) {
  return await generate({
    processor: PrettierProcessor(),
    spec,
    template: /* js */ `
      export default {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      };
    `,
  });
}
