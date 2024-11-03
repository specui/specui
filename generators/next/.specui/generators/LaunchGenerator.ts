import { generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import type { Spec } from '../interfaces/Spec';

export async function LaunchGenerator({ spec }: { spec: Spec }) {
  return await generate({
    engine: JsonEngine,
    spec: {
      version: '0.2.0',
      configurations: [
        {
          type: 'node',
          request: 'launch',
          name: spec.title || spec.name || 'Dev Server',
          program: '${workspaceFolder}/node_modules/next/dist/bin/next',
          args: ['dev'],
          cwd: '${workspaceFolder}',
          runtimeArgs: ['--nolazy'],
          console: 'integratedTerminal',
          internalConsoleOptions: 'neverOpen',
        },
      ],
    },
  });
}
