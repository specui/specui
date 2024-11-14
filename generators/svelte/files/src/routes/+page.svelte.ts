import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function PageFile() {
  return await generate({
    processor: PrettierProcessor({
      parser: 'html',
    }),
    template: /* html */ `
      <h1>Welcome to SvelteKit</h1>
      <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>    
    `,
  });
}
