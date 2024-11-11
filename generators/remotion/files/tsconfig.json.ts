import { generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

export default async function TsConfigFile() {
  return await generate({
    engine: JsonEngine,
    spec: {
      compilerOptions: {
        target: 'ES2018',
        module: 'commonjs',
        jsx: 'react-jsx',
        strict: true,
        noEmit: true,
        lib: ['es2015'],
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        noUnusedLocals: true,
        incremental: true,
      },
      exclude: ['remotion.config.ts'],
    },
  });
}
