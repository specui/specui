import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { getFilesRecursively } from '../utils/getFilesRecursively';

export async function prepareAction() {
  const filesDir = join(process.cwd(), 'files');
  const jsFiles = getFilesRecursively(filesDir, filesDir);

  const compiledObject: Record<string, any> = {};

  for (const file of jsFiles) {
    const filePath = join(filesDir, file);
    if (existsSync(filePath)) {
      try {
        const filenameWithoutExtension = file.replace(/\.ts$/, '');

        const module = require(filePath);

        if (!module.default) {
          throw new Error(`No default export for generator at: ${filePath}`);
        }

        compiledObject[filenameWithoutExtension] = { ...module, isDynamic: filePath.includes('[') };
      } catch (error) {
        console.error(`Error loading file: ${filePath}`, error);
      }
    }
  }

  if (Object.keys(compiledObject).length > 0) {
    await writeFile(
      './generator.ts',
      `${Object.entries(compiledObject)
        .map(
          ([fileName, lib]) =>
            `import ${(lib as any).default.name}${
              lib.getDynamic ? ', { getDynamic }' : ''
            } from './files/${fileName}'`,
        )
        .join('\n')}

import { Spec } from './interfaces/Spec';

const replaceParams = (filePath: string, params: Record<string, string>): string => {
  const result = filePath.replace(
    /\\[([^\\]]+)\\]/g,
    (_, paramName) => params[paramName] || paramName,
  );
  return result;
};

export default async function generator(spec: Spec) {
  const output: Record<string, Buffer | string> = {};

${Object.entries(compiledObject)
  .filter(([_, lib]) => lib.isDynamic)
  .map(
    ([fileName, lib]) => `  const results = getDynamic(spec);\n  await Promise.all(
    results.map(async result => {
      output[replaceParams('${fileName}', result.params)] = await ${lib.default.name}(${
        lib.default.length > 0 ? 'result' : ''
      })
    })
  );`,
  )
  .join('\n')}
  
  return {
    ...output,
${Object.entries(compiledObject)
  .filter(([_, lib]) => !lib.isDynamic)
  .map(
    ([fileName, lib]) =>
      `    '${fileName}': await ${lib.default.name}(${lib.default.length > 0 ? 'spec' : ''}),`,
  )
  .join('\n')}
  }
}`,
    );
    return;
  }

  throw new Error('No JavaScript files found or loaded successfully in @specui/drizzle-generator.');
}
