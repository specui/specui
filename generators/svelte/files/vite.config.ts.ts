import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function ViteConfigFile() {
  return await generate({
    processor: PrettierProcessor(),
    template: /* ts */ `
      import { sveltekit } from '@sveltejs/kit/vite';
      import { defineConfig } from 'vite';

      export default defineConfig({
        plugins: [sveltekit()]
      });
    `,
  });
}
