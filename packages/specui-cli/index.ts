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

import { loadSpec } from './utils/loadSpec';

import { prepareAction } from './actions/prepareAction';
import { newAction } from './actions/newAction';
import pkg from './package.json';
import { generate } from './actions/generateAction';

program.name('specui').description(pkg.description).version(pkg.version);

program
  .command('prepare')
  .description('Prepares a generator for consumption')
  .action(prepareAction);

program
  .command('generate')
  .description('Generates code based on a spec')
  .option('-d, --delete', 'Delete files')
  .option('-f, --force', 'Force generation')
  .option('-w, --watch', 'Watch for spec changes')
  .action(async (options) => {
    const loadedSpec = await loadSpec();

    if (!loadedSpec) {
      throw new Error('No spec found.');
    }

    if (options.watch) {
      watchFile(loadedSpec.file, { interval: 1000 }, async () => {
        generate({ delete: options.delete, force: options.force });
      });
    } else {
      generate({ delete: options.delete, force: options.force });
    }
  });

program
  .command('new')
  .description('Creates a new SpecUI project')
  .option('-g, --generator <name>', 'Specify which generator to use')
  .option('-e, --example <name>', 'Specify which example to use')
  .action(newAction);

program.parse();
