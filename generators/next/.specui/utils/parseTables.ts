import { type IProcessor, generate } from '@specui/core';
import { camelCase, pascalCase } from 'change-case';
import { plural } from 'pluralize';
import type { Spec } from '../interfaces/Spec';

export async function parseTables({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const tables: {
    [file: string]: Buffer | string;
  } = {};
  if (spec.database?.type !== 'mongodb') {
    await Promise.all(
      Object.entries(spec.models || {}).map(async ([modelName, model]) => {
        const modelNamePlural = plural(modelName);
        const modelNamePluralPascal = pascalCase(modelNamePlural);
        tables[`lib/tables/${modelNamePluralPascal}Table.ts`] = await generate({
          processor: PrettierProcessor(),
          engine: async () => {
            return `
                import { ColumnType, Generated, sql } from 'kysely'
    
                import { db } from '@/lib/db'
                
                export interface ${modelNamePluralPascal}Table {
                  ${Object.entries(model.attributes)
                    .map(
                      ([attributeName, attribute]) =>
                        `${camelCase(attributeName)}: ${
                          attribute.key === 'primary'
                            ? `Generated<${attribute.type}>`
                            : attribute.type
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
                              : attribute.type === 'boolean'
                              ? 'boolean'
                              : attribute.type === 'number'
                              ? 'integer'
                              : 'varchar(255)'
                          }', (cb) => cb.${
                            attribute.key === 'primary' ? 'primaryKey()' : 'notNull()'
                          }${attribute.unique ? '.unique()' : ''})`,
                      )
                      .join('\n')}
                    .execute()
                }
              
              `;
          },
        });
      }),
    );
  }

  return tables;
}
