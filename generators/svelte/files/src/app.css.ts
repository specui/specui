import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function AppCssFile() {
  return await generate({
    processor: PrettierProcessor({
      parser: 'css',
    }),
    template: /* css */ `
      @import 'tailwindcss/base';
      @import 'tailwindcss/components';
      @import 'tailwindcss/utilities';
    `,
  });
}
