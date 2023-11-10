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
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, normalize } from 'path';

import { getNodeListOutput } from './utils/getNodeListOutput';
import { loadZappFile } from './utils/loadZappFile';
import { pathListToNodeList } from './utils/pathListToNodeList';

import pkg from './package.json';

program.name(pkg.name).description(pkg.description).version(pkg.version);

program.command('generate').action(async () => {
  const zappFile = await loadZappFile();

  const output: Record<string, string> = {};

  // generate code
  await Promise.all(
    Object.entries(zappFile).map(async ([fileName, generator]) => {
      const fileContents = await generator;
      const filePath = normalize(fileName);

      if (typeof fileContents !== 'string') {
        console.log(`Skipped: ${filePath}`);
        return;
      }

      output[filePath] = fileContents;
    }),
  );

  // write code to disk
  await Promise.all(
    Object.entries(output).map(async ([filePath, fileContents]) => {
      const dir = dirname(filePath);

      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(filePath, fileContents);
    }),
  );

  // print generated files
  const paths = Object.keys(output);
  const nodes = pathListToNodeList(paths);
  console.log('Generated Files:');
  console.log(getNodeListOutput(nodes));
});

program.parse();
