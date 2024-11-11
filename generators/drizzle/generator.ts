import GitIgnoreFile from './files/.gitignore'
import ReadmeFile from './files/README.md'
import DrizzleConfigFile from './files/drizzle.config.ts'
import PackageFile from './files/package.json'
import SchemaFile, { getDynamic as getDynamicSchemaFile } from './files/src/db/tables/[tableName].ts'
import MainFile from './files/src/index.ts'
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

  const resultsForSchemaFile = getDynamicSchemaFile(spec);
  await Promise.all(
    resultsForSchemaFile.map(async result => {
      output[replaceParams('src/db/tables/[tableName].ts', result.params)] = await SchemaFile(result)
    })
  );
  
  return {
    ...output,
    '.gitignore': await GitIgnoreFile(),
    'README.md': await ReadmeFile(spec),
    'drizzle.config.ts': await DrizzleConfigFile(),
    'package.json': await PackageFile(spec),
    'src/index.ts': await MainFile(),
    'tsconfig.json': await TsConfigFile(),
  }
}