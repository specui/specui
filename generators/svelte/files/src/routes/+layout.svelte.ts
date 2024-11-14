import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function LayoutFile() {
  return await generate({
    processor: PrettierProcessor({
      parser: 'html',
    }),
    template: /* html */ `
      <script lang="ts">
        import '../app.css';
        let { children } = $props();
      </script>

      {@render children()}
    `,
  });
}
