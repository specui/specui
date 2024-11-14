import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  target: 'node18',
  sourcemap: true,
  clean: true,
  noExternal: ['@specui/ai'],
});
