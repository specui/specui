import ReadmeGenerator from './files/README.md'
import DrizzleConfigGenerator from './files/drizzle.config.ts'
import PackageGenerator from './files/package.json'
import SchemaGenerator, { getDynamic } from './files/src/db/tables/[tableName].ts'
import MainGenerator from './files/src/index.ts'
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

  const results = getDynamic(spec);
  await Promise.all(
    results.map(async result => {
      output[replaceParams('src/db/tables/[tableName].ts', result.params)] = await SchemaGenerator(result)
    })
  );
  
  return {
    ...output,
    'README.md': await ReadmeGenerator(spec),
    'drizzle.config.ts': await DrizzleConfigGenerator(),
    'package.json': await PackageGenerator(spec),
    'src/index.ts': await MainGenerator(),
    'tsconfig.json': await TsConfigGenerator(),
  }
}