import { JsonEngine } from '@specui/json';
import { generate } from '@specui/core';

import { Spec } from '../interfaces/Spec';

export default async function PackageFile(spec: Spec) {
  return await generate({
    engine: JsonEngine,
    spec: {
      name: spec.name,
      version: spec.version,
      type: 'module',
      scripts: {
        dev: 'vite dev',
        build: 'vite build',
        preview: 'vite preview',
        check: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
        'check:watch': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch',
        format: 'prettier --write .',
      },
      devDependencies: {
        '@skeletonlabs/skeleton': '^2.10.3',
        '@skeletonlabs/tw-plugin': '^0.4.0',
        '@sveltejs/adapter-auto': '^3.0.0',
        '@sveltejs/kit': '^2.0.0',
        '@sveltejs/vite-plugin-svelte': '^4.0.0',
        '@types/eslint': '^9.6.0',
        autoprefixer: '^10.4.20',
        eslint: '^9.7.0',
        'eslint-config-prettier': '^9.1.0',
        'eslint-plugin-svelte': '^2.36.0',
        globals: '^15.0.0',
        prettier: '^3.3.2',
        'prettier-plugin-svelte': '^3.2.6',
        'prettier-plugin-tailwindcss': '^0.6.5',
        svelte: '^5.0.0',
        'svelte-check': '^4.0.0',
        tailwindcss: '^3.4.9',
        typescript: '^5.0.0',
        'typescript-eslint': '^8.0.0',
        vite: '^5.0.3',
      },
      packageManager:
        'pnpm@9.6.0+sha512.38dc6fba8dba35b39340b9700112c2fe1e12f10b17134715a4aa98ccf7bb035e76fd981cf0bb384dfa98f8d6af5481c2bef2f4266a24bfa20c34eb7147ce0b5e',
    },
  });
}
