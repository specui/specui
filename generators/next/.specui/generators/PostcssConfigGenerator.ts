import { type IProcessor, generate } from '@specui/core';

const template = /* ts */ `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`;

export async function PostcssConfigGenerator({
  PrettierProcessor,
}: {
  PrettierProcessor: IProcessor<any>;
}) {
  return await generate({
    processor: PrettierProcessor(),
    engine: () => template,
  });
}
