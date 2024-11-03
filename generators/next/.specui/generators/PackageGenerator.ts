import { generate } from '@specui/core';
import { JsonEngine } from '@specui/json';
import semver from 'semver';

import { Spec } from '../interfaces/Spec';

export async function PackageGenerator({
  existsSync,
  spec,
}: {
  existsSync?: (path: string) => boolean;
  spec: Spec;
}) {
  const pkg = existsSync?.(`${process.cwd()}/package.json`)
    ? require(`${process.cwd()}/package.json`)
    : {};

  return await generate({
    engine: JsonEngine,
    spec: {
      ...pkg,
      name: spec.name,
      version: spec.version,
      description: spec.description,
      license: spec.license,
      author: spec.author
        ? {
            name: spec.author.name,
            email: spec.author.email,
            url: spec.author.url,
          }
        : undefined,
      scripts: {
        ...pkg.scripts,
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        tauri: spec.platform?.desktop ? 'tauri' : undefined,
      },
      dependencies: {
        ...pkg.dependencies,
        '@clerk/nextjs': spec.auth?.integration === 'clerk' ? '^5.3.3' : undefined,
        '@radix-ui/react-alert-dialog': '^1.1.1',
        '@radix-ui/react-accordion': '^1.2.0',
        '@radix-ui/react-aspect-ratio': '^1.1.0',
        '@radix-ui/react-checkbox': '^1.1.1',
        '@radix-ui/react-dialog': '^1.1.2',
        '@radix-ui/react-icons': '^1.3.0',
        '@radix-ui/react-separator': '^1.1.0',
        '@radix-ui/react-slot': '^1.1.0',
        '@radix-ui/react-tooltip': '^1.1.3',
        ...(spec.platform?.desktop
          ? {
              '@tauri-apps/api': '^1.2.0',
            }
          : {}),
        ...(spec.vercel?.analytics
          ? {
              '@vercel/analytics': '^1.3.1',
            }
          : {}),
        ...(spec.database?.type === 'mongodb'
          ? {
              'mongodb-memory-server': '^10.0.0',
              mongoose: '^8.5.3',
            }
          : {
              '@vercel/postgres-kysely': '^0.5.0',
              kysely: '^0.26.3',
            }),
        axios: '^1.6.0',
        'class-variance-authority': '^0.7.0',
        clsx: '^2.1.1',
        'embla-carousel-react': '^8.1.8',
        'framer-motion': '^11.3.24',
        'lucide-react': '^0.454.0',
        next: '15.0.1',
        react: '19.0.0-rc-69d4b800-20241021',
        'react-dom': '19.0.0-rc-69d4b800-20241021',
        'react-icons': '^5.2.1',
        'react-markdown': '^9.0.0',
        resend: Object.values(spec.actions || {}).some((action) =>
          action.operations.some((operation) => operation.type === 'sendEmail'),
        )
          ? '^4.0.0'
          : undefined,
        'tailwind-merge': '^2.5.0',
        'next-auth': spec.auth?.integration === 'next-auth' ? '^4.23.1' : undefined,
        zod: '^3.21.4',
      },
      devDependencies: {
        ...pkg.devDependencies,
        ...(spec.platform?.desktop
          ? {
              '@tauri-apps/cli': '^1.2.2',
            }
          : {}),
        '@types/node': '^20',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        autoprefixer: '^10.4.16',
        eslint: '^8',
        'eslint-config-next': '15.0.1',
        postcss: '^8.4.31',
        tailwindcss: '^3.3.5',
        typescript: '^5',
      },
      engines: spec.package?.manager?.npm
        ? {
            npm: `>=${semver.major(spec.package.manager.npm).toString()} <${(
              semver.major(spec.package.manager.npm) + 1
            ).toString()}`,
          }
        : spec.package?.manager?.pnpm
        ? {
            pnpm: `>=${semver.major(spec.package.manager.pnpm).toString()} <${(
              semver.major(spec.package.manager.pnpm) + 1
            ).toString()}`,
          }
        : spec.package?.manager?.yarn
        ? {
            yarn: `>=${semver.major(spec.package.manager.yarn).toString()} <${(
              semver.major(spec.package.manager.yarn) + 1
            ).toString()}`,
          }
        : undefined,
      packageManager: spec.package?.manager?.pnpm
        ? `pnpm@${spec.package.manager.pnpm}`
        : spec.package?.manager?.yarn
        ? `yarn@${spec.package.manager.yarn}`
        : undefined,
    },
  });
}
