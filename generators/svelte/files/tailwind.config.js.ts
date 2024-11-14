import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

import { Spec } from '../interfaces/Spec';

export default async function TailwindConfigFile(spec: Spec) {
  return await generate({
    processor: PrettierProcessor(),
    spec,
    template: /* js */ `
      import type { Config } from 'tailwindcss';

      export default {
        content: ['./src/**/*.{html,js,svelte,ts}'],
      
        theme: {
          extend: {}
        },
      
        plugins: []
      } satisfies Config;
    `,
  });
}
