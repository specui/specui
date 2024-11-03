import { type IProcessor, generate } from '@specui/core';
import { pascalCase, titleCase } from 'change-case';
import type { Spec } from '../interfaces/Spec';

export async function parseSchemas({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const schemas: {
    [file: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.calls || {}).map(async ([callName, call]) => {
      schemas[`lib/schemas/${callName}Schema.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: () => `
              import { z } from "zod";
    
              export const ${callName}Schema = {
                request: z.object({
                  ${Object.entries(call.request || {})
                    .map(
                      ([propName, prop]) =>
                        `${propName}: z.string(${
                          prop.required
                            ? `{ required_error: "${titleCase(propName)} is required." }`
                            : ''
                        }),`,
                    )
                    .join('\n')}
                }),
              
                response: z.object({
                  ${Object.entries(call.response || {})
                    .map(
                      ([propName, prop]) =>
                        `${propName}: z.string(${
                          prop.required
                            ? `{ required_error: "${titleCase(propName)} is missing." }`
                            : ''
                        }),`,
                    )
                    .join('\n')}
                }),
              };
              
              export type ${pascalCase(callName)}Request = z.infer<
                typeof ${callName}Schema.request
              >;
              
              export type ${pascalCase(callName)}Response = z.infer<
                typeof ${callName}Schema.response
              >;
            `,
      });
    }),
  );

  return schemas;
}
