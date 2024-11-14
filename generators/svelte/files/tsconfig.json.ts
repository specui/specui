import { JsonEngine } from '@specui/json';
import { generate } from '@specui/core';

export default async function TsConfigFile() {
  return await generate({
    engine: JsonEngine,
    spec: {
      extends: './.svelte-kit/tsconfig.json',
      compilerOptions: {
        allowJs: true,
        checkJs: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        sourceMap: true,
        strict: true,
        moduleResolution: 'bundler',
      },
    },
  });
}
