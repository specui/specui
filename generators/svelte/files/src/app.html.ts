import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function AppHtmlFile() {
  return await generate({
    processor: PrettierProcessor({
      parser: 'html',
    }),
    template: /* html */ `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" href="%sveltekit.assets%/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          %sveltekit.head%
        </head>
        <body data-sveltekit-preload-data="hover">
          <div style="display: contents">%sveltekit.body%</div>
        </body>
      </html>
    `,
  });
}
