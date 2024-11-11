import GitIgnoreFile from './files/.gitignore'
import ReadmeFile from './files/README.md'
import PackageFile from './files/package.json'
import RemotionConfigFile from './files/remotion.config'
import RootFile from './files/src/Root.tsx'
import ComponentFile, { getDynamic as getDynamicComponentFile } from './files/src/components/[name].tsx'
import CompositionFile, { getDynamic as getDynamicCompositionFile } from './files/src/compositions/[name].tsx'
import IndexFile from './files/src/index.ts'
import TailwindFile from './files/src/tailwind.css'
import TailwindConfigFile from './files/tailwind.config.js'
import TsConfigFile from './files/tsconfig.json'

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

  const resultsForComponentFile = getDynamicComponentFile(spec);
  await Promise.all(
    resultsForComponentFile.map(async result => {
      output[replaceParams('src/components/[name].tsx', result.params)] = await ComponentFile(result)
    })
  );
  const resultsForCompositionFile = getDynamicCompositionFile(spec);
  await Promise.all(
    resultsForCompositionFile.map(async result => {
      output[replaceParams('src/compositions/[name].tsx', result.params)] = await CompositionFile(result)
    })
  );
  
  return {
    ...output,
    '.gitignore': await GitIgnoreFile(),
    'README.md': await ReadmeFile(),
    'package.json': await PackageFile(spec),
    'remotion.config': await RemotionConfigFile(),
    'src/Root.tsx': await RootFile(spec),
    'src/index.ts': await IndexFile(),
    'src/tailwind.css': await TailwindFile(),
    'tailwind.config.js': await TailwindConfigFile(),
    'tsconfig.json': await TsConfigFile(),
  }
}