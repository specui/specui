import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export function registerTsNode() {
  const tsConfigPath = resolve(process.cwd(), 'tsconfig.json');
  const tsConfigExists = existsSync(tsConfigPath);

  if (!tsConfigExists) {
    writeFileSync(
      tsConfigPath,
      JSON.stringify({
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
      }),
    );
  }

  require('ts-node').register();
}
