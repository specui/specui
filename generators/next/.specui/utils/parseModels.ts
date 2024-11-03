import { type IProcessor, generate } from '@specui/core';
import { camelCase, pascalCase } from 'change-case';
import { singular } from 'pluralize';
import type { Spec } from '../interfaces/Spec';

function mapAttributeTypeToMongoType(type: string) {
  if (type === 'boolean') {
    return 'Boolean';
  }
  return 'String';
}

export async function parseModels({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const models: {
    [file: string]: Buffer | string;
  } = {};
  if (spec.database?.type === 'mongodb') {
    await Promise.all(
      Object.entries(spec.models || {}).map(async ([modelName, model]) => {
        const modelNameSingular = singular(modelName);
        const modelNameSingularPascal = pascalCase(modelNameSingular);
        models[`lib/models/${modelNameSingularPascal}Model.ts`] = await generate({
          processor: PrettierProcessor(),
          engine: async () => /* ts */ `
                import { Document, Schema, model, models } from 'mongoose';
    
                export interface ${modelNameSingularPascal}Document extends Document {
                  ${Object.entries(model.attributes)
                    .map(
                      ([attributeName, attribute]) =>
                        `${camelCase(attributeName)}: ${
                          attribute.key === 'primary' ? `string` : attribute.type
                        }`,
                    )
                    .join(';\n')}
                  createdAt: Date;
                }
                
                export const ${modelNameSingularPascal}Model = models.${modelNameSingularPascal} || model<${modelNameSingularPascal}Document>(
                  '${modelNameSingularPascal}',
                  new Schema<${modelNameSingularPascal}Document>({
                    ${Object.entries(model.attributes)
                      .map(
                        ([attributeName, attribute]) =>
                          `${camelCase(attributeName)}: ${
                            attribute.key === 'primary'
                              ? `Schema.ObjectId`
                              : mapAttributeTypeToMongoType(attribute.type)
                          }`,
                      )
                      .join(',\n')}
                  })
                );
              
              `,
        });
      }),
    );
  }

  return models;
}
