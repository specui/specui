const esbuild = require('esbuild');
const postCssPlugin = require('esbuild-postcss');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

esbuild
  .build({
    entryPoints: ['./webview/editor.tsx'],
    bundle: true,
    outfile: './bundle/editor.js',
    minify: true,
    sourcemap: true,
    platform: 'browser',
    loader: { '.tsx': 'tsx', '.ts': 'ts', '.css': 'css' },
    plugins: [
      postCssPlugin({
        plugins: [tailwindcss, autoprefixer],
      }),
    ],
  })
  .catch(() => process.exit(1));
