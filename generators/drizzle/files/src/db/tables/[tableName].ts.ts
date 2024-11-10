import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';
import { plural } from 'pluralize';
import type { Model, ModelAttribute, ModelAttributeType, Spec } from '../../../../interfaces/Spec';

let camelCase: (input: string) => string;

export function getDynamic(spec: Spec) {
  return Object.entries(spec.models || {}).map(([modelName, model]) => ({
    spec: model,
    params: {
      tableName: plural(modelName),
    },
  }));
}

export default async function SchemaGenerator({
  spec: model,
  params: { tableName },
}: {
  spec: Model;
  params: { tableName: string };
}) {
  function getAttribute(attribute: ModelAttribute) {
    const types: Record<ModelAttributeType, string> = {
      number: 'integer',
      string: 'varchar',
    };

    const attributes: string[] = [];
    attributes.push(`${types[attribute.type ?? 'string']}()`);
    if (attribute.primaryKey) attributes.push('primaryKey()');
    if (attribute.required) attributes.push('notNull()');
    if (attribute.unique) attributes.push('unique()');

    if (attribute.association) {
      const { model: associatedModel, type } = attribute.association;
      if (associatedModel && type === 'belongsTo') {
        attributes.push(`references(${plural(associatedModel)}Table.id)`);
      }
    }

    return attributes.join('.');
  }

  return await generate({
    processor: PrettierProcessor(),
    template: /* ts */ `
      import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

      export const ${tableName}Table = pgTable("${tableName}", {
        ${Object.entries(model.attributes || {})
          .map(([attributeName, attribute]) => `${attributeName}: ${getAttribute(attribute)},`)
          .join('\n')}
      });
    `,
  });
}
