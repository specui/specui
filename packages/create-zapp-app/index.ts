#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import prompts from 'prompts';
import { safeDump } from 'js-yaml';

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
      '@zappjs/cli': '^2.2.1',
      '@zappjs/next-zapp': '^0.2.0',
    },
    scripts: {
      generate: 'zapp generate',
    },
  };

  await writeFile(join(dir, 'package.json'), JSON.stringify(projectPackage, null, 2));
  await writeFile(
    join(dir, '.zapp/spec.yml'),
    safeDump({
      name: name,
      version: '0.1.0',
      description: 'Created by create-zapp-app',
      license: 'MIT',
      auth: {
        providers: ['github'],
      },
      calls: {
        createPost: {
          request: {
            name: {
              type: 'string',
            },
          },
        },
        getPost: {
          request: {
            id: {
              type: 'number',
            },
          },
        },
      },
      models: {
        authors: {
          attributes: {
            id: {
              key: 'primary',
              type: 'number',
            },
            name: {
              type: 'string',
              unique: true,
            },
          },
        },
        comments: {
          attributes: {
            postId: {
              type: 'number',
            },
            message: {
              type: 'string',
            },
          },
        },
        post: {
          attributes: {
            id: {
              key: 'primary',
              type: 'number',
            },
            name: {
              unique: true,
              type: 'string',
            },
            slug: {
              unique: true,
              type: 'string',
            },
          },
        },
        users: {
          attributes: {
            id: {
              key: 'primary',
              type: 'number',
            },
            username: {
              type: 'string',
              unique: true,
            },
            password: {
              type: 'string',
            },
          },
        },
      },
    }),
  );
  await writeFile(join(dir, '.zapp/zapp.ts'), `export { default } from '@zappjs/next-zapp';\n`);
});

program.parse();
