import { type IProcessor, generate } from '@specui/core';
import { camelCase, pascalCase } from 'change-case';
import { plural } from 'pluralize';
import type { Spec } from '../interfaces/Spec';

function getActionType(
  type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect' | 'sendEmail',
) {
  if (type === 'delete') {
    return 'deleteFrom';
  }
  if (type === 'insert') {
    return 'insertInto';
  }
  return 'updateTable';
}

export async function parseActions({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const actions: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.actions || {}).map(async ([actionName, action]) => {
      actions[`actions/${camelCase(actionName)}.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => `
              'use server';
    
              ${
                action.operations.some((op) => ['delete', 'insert', 'update'].includes(op.type))
                  ? spec.database?.type === 'mongodb'
                    ? `import { connectToMemoryDB } from '@/lib/mongo';`
                    : `import { db } from '@/lib/db';`
                  : ''
              }${
                action.operations.some((op) => ['revalidate'].includes(op.type))
                  ? `import { revalidatePath } from 'next/cache';`
                  : ''
              }${
                action.operations.some((op) => ['redirect'].includes(op.type))
                  ? `import { redirect } from 'next/navigation';`
                  : ''
              }${
                action.operations.some((op) => ['sendEmail'].includes(op.type))
                  ? `import { Resend } from 'resend';\n\nconst resend = new Resend(process.env.RESEND_API_KEY ?? "missing_api_key");`
                  : ''
              }
              ${action.operations
                .filter((op) => ['delete', 'insert', 'update'].includes(op.type))
                .map(
                  (operation) =>
                    `import { ${pascalCase(
                      operation.model ?? '',
                    )}Model } from '@/lib/models/${pascalCase(operation.model ?? '')}Model'`,
                )}
    
              export default async function ${camelCase(actionName)}(
                formData: FormData
              ) {
                ${spec.database?.type === 'mongodb' ? 'await connectToMemoryDB();' : ''}
    
                const props = {
                  ${Object.keys(action.props)
                    .map((propName) => `${propName}: formData.get('${propName}') as string,`)
                    .join('\n')}
                };
    
                ${action.operations
                  .map((operation) =>
                    ['delete', 'insert', 'update'].includes(operation.type) &&
                    spec.database?.type === 'mongodb'
                      ? `
                        const ${operation.model} = new ${pascalCase(operation.model ?? '')}Model(${
                          operation.data
                            ? `({
                                ${Object.entries(operation.data)
                                  .map(
                                    ([name, value]) =>
                                      `${name}: ${
                                        typeof value === 'string' && value.startsWith('$')
                                          ? `${value.slice(1)} as any`
                                          : typeof value === 'string'
                                          ? `'${value}'`
                                          : value
                                      }`,
                                  )
                                  .join(',')}
                              })`
                            : ''
                        }); 
    
                        await ${operation.model}.save();
                      `
                      : ['delete', 'insert', 'update'].includes(operation.type) &&
                        spec.database?.type !== 'mongodb'
                      ? `
                    await db.${getActionType(operation.type)}('${camelCase(
                      plural(operation.model || ''),
                    )}')
                      ${
                        operation.data
                          ? `.${operation.type === 'update' ? 'set' : 'values'}({
                              ${Object.entries(operation.data)
                                .map(
                                  ([name, value]) =>
                                    `${name}: ${
                                      typeof value === 'string' && value.startsWith('$')
                                        ? `${value.slice(1)} as any`
                                        : typeof value === 'string'
                                        ? `'${value}'`
                                        : value
                                    }`,
                                )
                                .join(',')}
                            })`
                          : ''
                      }${
                        operation.where
                          ? `${Object.entries(operation.where)
                              .map(
                                ([name, value]) =>
                                  `.where('${name}', '=', ${
                                    typeof value === 'string' && value.startsWith('$')
                                      ? `${value.slice(1)} as any`
                                      : typeof value === 'string'
                                      ? `'${value}'`
                                      : value
                                  })`,
                              )
                              .join('\n')}
                            `
                          : ''
                      }.execute()
                  `
                      : operation.type === 'redirect'
                      ? `redirect('${operation.path}')`
                      : operation.type === 'revalidate'
                      ? `revalidatePath('${operation.path}')`
                      : operation.type === 'sendEmail'
                      ? `
                        await resend.emails.send({
                          from: '${operation.data?.from ?? 'Acme <onboarding@resend.dev>'}',
                          to: ['${operation.data?.to}'],
                          ${
                            operation.data?.replyTo
                              ? `replyTo: ${
                                  operation.data.replyTo.startsWith('$')
                                    ? operation.data.replyTo.slice(1)
                                    : `'${operation.data.replyTo}'`
                                },`
                              : ''
                          }
                          subject: '${operation.data?.subject ?? 'Hello'}',
                          html: ${
                            operation.data?.html.startsWith('$')
                              ? operation.data.html.slice(1)
                              : operation.data
                              ? `${operation.data.html}`
                              : '<p>It works!</p>'
                          }
                        });
                      `
                      : '',
                  )
                  .join('\n')}
              }
            `,
      });
    }),
  );

  return actions;
}
