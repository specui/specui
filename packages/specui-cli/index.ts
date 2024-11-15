import { program } from 'commander';
import { watchFile } from 'fs';

import { loadSpec } from './utils/loadSpec';

import { aiAction } from './actions/aiAction';
import { generate } from './actions/generateAction';
import { newAction } from './actions/newAction';
import { prepareAction } from './actions/prepareAction';

program.name('specui').description('Build UIs with Specs');

program
  .command('ai')
  .description('Uses AI to write specs')
  .option('-d, --delete', 'Delete files')
  .option('-f, --force', 'Force generation')
  .option('-m, --message <message>', 'Your AI message')
  .action(aiAction);

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
