import GitignoreFile from './files/.gitignore'
import NpmConfigFile from './files/.npmrc'
import PrettierIgnoreFile from './files/.prettierignore'
import PrettierConfigFile from './files/.prettierrc'
import SvelteKitTsConfigFile from './files/.svelte-kit/tsconfig.json'
import ReadmeFile from './files/README.md'
import EslintConfigFile from './files/eslint.config.js'
import PackageFile from './files/package.json'
import PostcssConfigFile from './files/postcss.config.js'
import AppCssFile from './files/src/app.css'
import AppHtmlFile from './files/src/app.html'
import LayoutFile from './files/src/routes/+layout.svelte'
import PageFile, { getDynamic as getDynamicPageFile } from './files/src/routes/[route]/+page.svelte'
import SvelteConfigFile from './files/svelte.config.js'
import TailwindConfigFile from './files/tailwind.config.ts'
import TsConfigFile from './files/tsconfig.json'
import ViteConfigFile from './files/vite.config.ts'

import { Spec } from './interfaces/Spec';

const replaceParams = (filePath: string, params: Record<string, string>): string => {
  const result = filePath.replace(
    /\[([^\]]+)\]/g,
    (_, paramName) => params[paramName] || paramName,
  );
  return result;
};

export default async function generator(spec: Spec) {
  const output: Record<string, Buffer | string> = {};

  const resultsForPageFile = getDynamicPageFile(spec);
  await Promise.all(
    resultsForPageFile.map(async result => {
      output[replaceParams('src/routes/[route]/+page.svelte', result.params)] = await PageFile(result)
    })
  );
  
  return {
    ...output,
    '.gitignore': await GitignoreFile(),
    '.npmrc': await NpmConfigFile(),
    '.prettierignore': await PrettierIgnoreFile(),
    '.prettierrc': await PrettierConfigFile(),
    '.svelte-kit/tsconfig.json': await SvelteKitTsConfigFile(),
    'README.md': await ReadmeFile(spec),
    'eslint.config.js': await EslintConfigFile(),
    'package.json': await PackageFile(spec),
    'postcss.config.js': await PostcssConfigFile(spec),
    'src/app.css': await AppCssFile(),
    'src/app.html': await AppHtmlFile(spec),
    'src/routes/+layout.svelte': await LayoutFile(),
    'svelte.config.js': await SvelteConfigFile(spec),
    'tailwind.config.ts': await TailwindConfigFile(spec),
    'tsconfig.json': await TsConfigFile(),
    'vite.config.ts': await ViteConfigFile(),
  }
}