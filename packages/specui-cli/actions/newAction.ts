import { mkdir, writeFile } from 'fs/promises';
import { dirname, normalize } from 'path';
import { stringify } from 'yaml';

import { loadSpec } from '../utils/loadSpec';

export async function newAction() {
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
}
