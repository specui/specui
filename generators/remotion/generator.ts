import ReadmeGenerator from './files/README.md'
import PackageGenerator from './files/package.json'
import RemotionConfigGenerator from './files/remotion.config'
import RootGenerator from './files/src/Root.tsx'
import ComponentGenerator, { getDynamic as getDynamicComponentGenerator } from './files/src/components/[name].tsx'
import CompositionGenerator, { getDynamic as getDynamicCompositionGenerator } from './files/src/compositions/[name].tsx'
import IndexGenerator from './files/src/index.ts'
import TailwindGenerator from './files/src/tailwind.css'
import TailwindConfigGenerator from './files/tailwind.config.js'
import TsConfigGenerator from './files/tsconfig.json'

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

  const resultsForComponentGenerator = getDynamicComponentGenerator(spec);
  await Promise.all(
    resultsForComponentGenerator.map(async result => {
      output[replaceParams('src/components/[name].tsx', result.params)] = await ComponentGenerator(result)
    })
  );
  const resultsForCompositionGenerator = getDynamicCompositionGenerator(spec);
  await Promise.all(
    resultsForCompositionGenerator.map(async result => {
      output[replaceParams('src/compositions/[name].tsx', result.params)] = await CompositionGenerator(result)
    })
  );
  
  return {
    ...output,
    'README.md': await ReadmeGenerator(),
    'package.json': await PackageGenerator(spec),
    'remotion.config': await RemotionConfigGenerator(),
    'src/Root.tsx': await RootGenerator(spec),
    'src/index.ts': await IndexGenerator(),
    'src/tailwind.css': await TailwindGenerator(),
    'tailwind.config.js': await TailwindConfigGenerator(),
    'tsconfig.json': await TsConfigGenerator(),
  }
}