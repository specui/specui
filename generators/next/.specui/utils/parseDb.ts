import { type IProcessor, generate } from '@specui/core';
import { camelCase, pascalCase } from 'change-case';
import { plural } from 'pluralize';
import type { Spec } from '../interfaces/Spec';

export async function parseDb({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const modelNamesPluralCamelCase = Object.keys(spec.models || {}).map((model) =>
    camelCase(plural(model)),
  );
  const modelNamesPluralPascal = Object.keys(spec.models || {}).map((model) =>
    pascalCase(plural(model)),
  );

  const db: Record<string, string | Buffer> = {};
  if (spec.database?.type === 'mongodb') {
    db['lib/client.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: () => `
          import axios from "axios";
  
          ${Object.entries(spec.calls || {})
            .map(
              ([callName]) => `
              import {
                ${pascalCase(callName)}Request,
                ${pascalCase(callName)}Response,
              } from "@/lib/schemas/${camelCase(callName)}Schema";
            `,
            )
            .join('\n')} 
  
          export type Call = <T>(method: string, data: any) => Promise<T>;
          
          export const call: Call = async (method, data) => {
            const res = await axios({
              method: "POST",
              headers:
                typeof localStorage !== "undefined" && localStorage.getItem("accessToken")
                  ? {
                      Authorization: \`Bearer \${localStorage.getItem("accessToken")}\`,
                    }
                  : {},
              url: \`/api\${method}\`,
              data: data || {},
            });
          
            return res.data;
          };
  
          ${Object.entries(spec.calls || {})
            .map(
              ([callName]) => `
              export const ${callName} = async (req?: ${pascalCase(callName)}Request) => {
                return await call<${pascalCase(callName)}Response>("/${callName}", req);
              };
            `,
            )
            .join('\n')} 
        `,
    });

    db['lib/mongo.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
          import { MongoMemoryServer } from 'mongodb-memory-server';
          import mongoose from 'mongoose';
          
          let mongoServer: MongoMemoryServer;
          
          export const connectToMemoryDB = async () => {
            if (mongoServer) {
              return;
            }
  
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
          
            await mongoose.connect(uri);
          };
          
          export const disconnectFromMemoryDB = async () => {
            await mongoose.disconnect();
            await mongoServer.stop();
          };
        `,
    });
  } else {
    db['lib/db.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: async () => {
        return /*ts*/ `
            import { createKysely } from '@vercel/postgres-kysely'
      
            ${modelNamesPluralPascal
              .map(
                (modelName) =>
                  `import { ${modelName}Table, create${modelName}Table } from '@/lib/tables/${modelName}Table'`,
              )
              .join('\n')}
            
            export interface Database {
              ${modelNamesPluralPascal
                .map((modelName) => `${camelCase(modelName)}: ${modelName}Table`)
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
    });
  }

  return db;
}
