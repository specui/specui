require('ts-node').register({
  $schema: 'https://json.schemastore.org/tsconfig',
  display: 'Default',
  compilerOptions: {
    lib: ['esnext', 'dom'],
    module: 'commonjs',
    composite: false,
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    inlineSources: false,
    isolatedModules: true,
    moduleResolution: 'node',
    noUnusedLocals: false,
    noUnusedParameters: false,
    preserveWatchOutput: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    strictNullChecks: true,
    outDir: 'dist/',
    paths: {
      '@/*': ['./*'],
    },
  },
  exclude: ['node_modules'],
});

import { program } from 'commander';
import { watchFile } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, normalize } from 'path';
import { stringify } from 'yaml';

import { loadSpec } from './utils/loadSpec';

import pkg from './package.json';
import { generate } from './generate';

program.name('specui').description(pkg.description).version(pkg.version);

program
  .command('generate')
  .option('-f, --force', 'force generation')
  .option('-w, --watch', 'watch for spec changes')
  .action(async (options) => {
    const loadedSpec = await loadSpec();

    if (!loadedSpec) {
      throw new Error('No spec found.');
    }

    if (options.watch) {
      watchFile(loadedSpec.file, { interval: 1000 }, async () => {
        generate({ force: options.force });
      });
    } else {
      generate({ force: options.force });
    }
  });

program.command('new').action(async (options) => {
  const loadedSpec = await loadSpec();

  if (loadedSpec) {
    throw new Error('Spec already exists.');
  }

  const specFile = normalize(`${process.cwd()}/.specui/spec.yml`);

  await mkdir(dirname(specFile), { recursive: true });

  await writeFile(
    specFile,
    stringify({
      title: 'My App',
      name: 'my-app',
      version: '1.0.0',
      description: 'this is my cool app',
      license: 'MIT',
      pages: {
        index: {
          elements: [
            {
              tag: 'section',
              class: ['flex', 'flex-col', 'h-dvh', 'items-center', 'justify-center'],
              elements: [
                {
                  tag: 'h1',
                  text: 'Spec. Preview. Ship.',
                  class: ['font-sans', 'mb-2', 'text-2xl', 'text-center'],
                },
                {
                  tag: 'h2',
                  text: 'Build at lightning-speed',
                  class: ['font-sans-serif', 'font-lg', 'text-center', 'text-gray-400'],
                },
              ],
            },
          ],
        },
      },
    }),
  );
});

program.parse();
