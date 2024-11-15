import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

import { Spec } from '../interfaces/Spec';

export default async function TailwindConfigFile({ theme = 'skeleton' }: Spec) {
  return await generate({
    processor: PrettierProcessor(),
    template: /* js */ `
      import { skeleton } from '@skeletonlabs/tw-plugin';
      import { join } from 'path';
      import type { Config } from 'tailwindcss';

      export default {
        content: ['./src/**/*.{html,js,svelte,ts}'],
        darkMode: 'class',
      
        content: [
          './src/**/*.{html,js,svelte,ts}',
          join(require.resolve(
            '@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}'
          )
        ],

        theme: {
          extend: {}
        },
      
        plugins: [
          skeleton({
            themes: { preset: [ "${theme}" ] }
          })
        ]
      } satisfies Config;
    `,
  });
}
