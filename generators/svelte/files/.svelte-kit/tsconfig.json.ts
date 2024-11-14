import { JsonEngine } from '@specui/json';
import { generate } from '@specui/core';

export default async function SvelteKitTsConfigFile() {
  return await generate({
    engine: JsonEngine,
    spec: {
      compilerOptions: {
        paths: {
          $lib: ['../src/lib'],
          '$lib/*': ['../src/lib/*'],
        },
        rootDirs: ['..', './types'],
        verbatimModuleSyntax: true,
        isolatedModules: true,
        lib: ['esnext', 'DOM', 'DOM.Iterable'],
        moduleResolution: 'bundler',
        module: 'esnext',
        noEmit: true,
        target: 'es2015',
      },
      include: [
        'ambient.d.ts',
        'non-ambient.d.ts',
        './types/**/$types.d.ts',
        '../vite.config.js',
        '../vite.config.ts',
        '../src/**/*.js',
        '../src/**/*.ts',
        '../src/**/*.svelte',
        '../tests/**/*.js',
        '../tests/**/*.ts',
        '../tests/**/*.svelte',
      ],
      exclude: [
        '../node_modules/**',
        '../src/service-worker.js',
        '../src/service-worker/**/*.js',
        '../src/service-worker.ts',
        '../src/service-worker/**/*.ts',
        '../src/service-worker.d.ts',
        '../src/service-worker/**/*.d.ts',
      ],
    },
  });
}
