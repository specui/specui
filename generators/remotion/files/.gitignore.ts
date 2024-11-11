import { generate } from '@specui/core';

export default async function GitIgnoreGenerator() {
  return await generate({
    template: ['build/', 'node_modules/', '.DS_Store'].join('\n'),
  });
}
