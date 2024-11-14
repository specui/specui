import { JsonEngine } from '@specui/json';
import { generate } from '@specui/core';

export default async function PrettierConfigFile() {
  return await generate({
    engine: JsonEngine,
    spec: {
      useTabs: true,
      singleQuote: true,
      trailingComma: 'none',
      printWidth: 100,
      plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
      overrides: [
        {
          files: '*.svelte',
          options: {
            parser: 'svelte',
          },
        },
      ],
    },
  });
}
