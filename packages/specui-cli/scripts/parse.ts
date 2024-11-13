import { camelCase, kebabCase, pascalCase } from '@specui/utils';
import { lstat, readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { format } from 'prettier';
import { parse as yamlParse } from 'yaml';

export async function parse() {
  console.log('Parsing...');

  const examplesDir = join(process.cwd(), '..', '..', 'examples');

  const examples: string[] = [];
  const imports: Record<string, string[]> = {};
  const files = await readdir(examplesDir);
  for (const file of files) {
    const fullPath = join(examplesDir, file);
    const stat = await lstat(fullPath);

    if (stat.isDirectory()) {
      const filePath = join(fullPath, '.specui', 'spec.yml');
      const data = yamlParse(await readFile(filePath, 'utf8'));

      const fileName = fullPath.split('/').slice(-1)[0];
      const [generator, ...name] = fileName.split('-');

      if (!imports[generator]) {
        imports[generator] = [];
      }
      imports[generator].push(fileName);
      examples.push(fileName);

      await writeFile(`./examples/${fileName}.json`, JSON.stringify(data, null, 2));
    }
  }

  const template = `
    ${examples
      .map((example) => `import ${pascalCase(example)} from './${example}.json';`)
      .join('\n')}

    export const examples: Record<string, any> = {
      ${examples.map((example) => `'${kebabCase(example)}': ${pascalCase(example)},`).join('\n')}
    }

    ${Object.entries(imports)
      .map(
        ([generator, examples]) => `
          export const ${camelCase(generator)} = [
            ${examples.map((example) => `  '${example}',`).join('\n')}
          ]
        `,
      )
      .join('\n')}
  `;

  await writeFile(
    './examples/index.ts',
    await format(template, {
      parser: 'babel-ts',
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
    }),
  );
}

parse();
