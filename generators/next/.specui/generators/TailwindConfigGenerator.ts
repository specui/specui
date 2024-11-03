import { type IProcessor, generate } from '@specui/core';

const template = /* ts */ `
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config;
`;

export async function TailwindConfigGenerator({
  PrettierProcessor,
}: {
  PrettierProcessor: IProcessor<any>;
}) {
  return await generate({
    processor: PrettierProcessor(),
    engine: () => template,
  });
}
