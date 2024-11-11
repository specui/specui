import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function TailwindConfigFile() {
  return await generate({
    processor: PrettierProcessor(),
    template: /* ts */ `
      /* eslint-env node */
      module.exports = {
        content: ["./src/**/*.{ts,tsx,js,jsx}"],
        theme: {
          extend: {},
        },
        plugins: [],
      };
    `,
  });
}
