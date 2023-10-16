import { generate } from '@zappjs/core';
import { GitignoreGenerator } from '@zappjs/git';
import { JsonEngine } from '@zappjs/json';
import { PrettierProcessor } from '@zappjs/prettier';
import { camelCase, pascalCase } from 'change-case';
import { readFileSync } from 'fs';
import { plural } from 'pluralize';

interface ISpec {
  calls: {
    [name: string]: {
      request: {};
      response: {};
    };
  };
  models: {
    [name: string]: {
      attributes: {
        [name: string]: {
          key?: 'primary';
          type: 'number' | 'string';
          unique?: boolean;
        };
      };
    };
  };
}

export default function zapp(spec: ISpec) {
  const pkg = require(`${process.cwd()}/package.json`);

  const modelNamesPluralCamelCase = Object.keys(spec.models).map((model) =>
    camelCase(plural(model)),
  );
  const modelNamesPluralPascal = Object.keys(spec.models).map((model) => pascalCase(plural(model)));

  const tables: {
    [file: string]: Promise<string>;
  } = {};
  Object.entries(spec.models).forEach(([modelName, model]) => {
    const modelNamePlural = plural(modelName);
    const modelNamePluralPascal = pascalCase(modelNamePlural);
    tables[`src/tables/${modelNamePluralPascal}Table.ts`] = generate({
      processor: PrettierProcessor,
      engine: async () => {
        return `
          import { ColumnType, Generated, sql } from 'kysely'

          import { db } from '../lib/db'
          
          export interface ${modelNamePluralPascal}Table {
            ${Object.entries(model.attributes)
              .map(
                ([attributeName, attribute]) =>
                  `${camelCase(attributeName)}: ${
                    attribute.key === 'primary' ? `Generated<${attribute.type}>` : attribute.type
                  }`,
              )
              .join('\n')}
            createdAt: ColumnType<Date, string | undefined, never>
          }
          
          export const create${modelNamePluralPascal}Table = async () => {
            await db.schema
              .createTable('${modelNamePlural}')
              .ifNotExists()
              ${Object.entries(model.attributes)
                .map(
                  ([attributeName, attribute]) =>
                    `.addColumn('${camelCase(attributeName)}', '${
                      attribute.key === 'primary'
                        ? 'serial'
                        : attribute.type === 'number'
                        ? 'integer'
                        : 'varchar(255)'
                    }', (cb) => cb.${attribute.key === 'primary' ? 'primaryKey()' : 'notNull()'}${
                      attribute.unique ? '.unique()' : ''
                    })`,
                )
                .join('\n')}
              .execute()
          }
        
        `;
      },
    });
  });

  return {
    ...tables,
    'src/lib/db.ts': generate({
      processor: PrettierProcessor,
      engine: async () => {
        return /*ts*/ `
          import { createKysely } from '@vercel/postgres-kysely'
    
          ${modelNamesPluralPascal
            .map(
              (modelName) =>
                `import { ${modelName}Table, create${modelName}Table } from '../tables/${modelName}Table'`,
            )
            .join('\n')}
          
          export interface Database {
            ${modelNamesPluralPascal
              .map((modelName) => `${modelName}: ${modelName}Table`)
              .join('\n')}
          }
          
          export const db = createKysely<Database>()
          
          export const deinit = async () => {
            const tables = [
              ${modelNamesPluralCamelCase.map((modelName) => `'${modelName}'`).join(',')}
            ]
          
            for (let i = 0; i < tables.length; i++) {
              await db.schema.dropTable(tables[i]).ifExists().execute()
            }
          }
          
          export const init = async () => {
            ${modelNamesPluralPascal
              .map((modelName) => `await create${modelName}Table()`)
              .join('\n')}
          }
          
          export const seed = async () => {}
        `;
      },
    }),
    '.gitignore': GitignoreGenerator(['dist/', 'node_modules/', '.DS_Store']),
    'package.json': generate({
      engine: JsonEngine,
      spec: {
        ...pkg,
        dependencies: {
          ...pkg.dependencies,
          '@vercel/postgres-kysely': '^0.5.0',
          kysely: '^0.26.3',
        },
      },
    }),
  };
}
