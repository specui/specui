import { generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { Spec } from '../interfaces/Spec';

export default async function PackageGenerator(spec: Spec) {
  return await generate({
    engine: JsonEngine,
    spec: {
      name: spec.name,
      version: spec.version,
      description: spec.description,
      private: spec.private,
      dependencies: {
        '@remotion/cli': '4.0.228',
        '@remotion/tailwind': '4.0.228',
        '@remotion/zod-types': '4.0.228',
        react: '18.3.1',
        'react-dom': '18.3.1',
        remotion: '4.0.228',
        zod: '3.22.3',
      },
      devDependencies: {
        '@remotion/eslint-config': '4.0.228',
        '@types/react': '18.3.1',
        '@types/web': '0.0.166',
        eslint: '8.56.0',
        prettier: '3.3.3',
        typescript: '5.5.4',
      },
      scripts: {
        build: 'remotion bundle',
        dev: 'remotion studio',
        lint: 'eslint src --ext ts,tsx,js,jsx && tsc',
        upgrade: 'remotion upgrade',
      },
      sideEffects: ['*.css'],
    },
  });
}
