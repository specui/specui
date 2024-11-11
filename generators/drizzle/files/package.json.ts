import { generate } from '@specui/core';
import { JsonEngine } from '@specui/json';

import { Spec } from '../interfaces/Spec';

export default async function PackageGenerator(spec: Spec) {
  return await generate({
    engine: JsonEngine,
    spec: {
      name: spec.name,
      version: spec.version,
      private: spec.private,
      dependencies: {
        dotenv: '^16.4.5',
        'drizzle-orm': '^0.36.1',
        postgres: '^3.4.5',
      },
      devDependencies: {
        '@types/node': '^20',
        'drizzle-kit': '^0.28.0',
        tsx: '^4.19.2',
      },
    },
  });
}
