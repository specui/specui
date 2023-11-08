#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { cyan, green, red, yellow, bold, blue } from 'picocolors';
import prompts from 'prompts';

import pkg from './package.json';

const program = new Command(pkg.name).version(pkg.version).action(async () => {
  const { value: name } = await prompts({
    type: 'text',
    name: 'value',
    message: 'What is the name of your project?',
  });

  const { value: zapp } = await prompts({
    type: 'text',
    name: 'value',
    initial: '@zappjs/next-zapp',
    message: 'Which Zapp do you want to use?',
  });

  const dir = join(process.cwd(), name);
  const zappDir = join(dir, '.zapp');

  if (!existsSync(dir)) {
    await mkdir(dir);
  }
  if (!existsSync(zappDir)) {
    await mkdir(zappDir);
  }

  const projectPackage = {
    name: name,
    version: '0.1.0',
    description: 'Created by create-zapp-app',
    private: true,
    devDependencies: {
      '@zappjs/cli': '^2.0.0',
      "@zappjs/next-zapp": "^0.1.3",
    },
    scripts: {
      generate: 'zapp generate',
    },
  };

  await writeFile(join(dir, 'package.json'), JSON.stringify(projectPackage, null, 2));
  await writeFile(join(dir, '.zapp/spec.yml'), 'name: test');
  await writeFile(join(dir, '.zapp/zapp.ts'), `export { default } from '@zappjs/next-zapp';\n`);
});

program.parse();
