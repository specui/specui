import { generate } from '@specui/core';
import { HandlebarsEngine } from '@specui/handlebars';
import { PrettierProcessor } from '@specui/prettier';

export default async function MainGenerator() {
  return await generate({
    engine: HandlebarsEngine,
    processor: PrettierProcessor(),
    template: /* ts */ `
      import { drizzle } from 'drizzle-orm/postgres-js'
      import postgres from 'postgres'
      async function main() {
          const client = postgres(process.env.DATABASE_URL ?? '');
          const db = drizzle({ client });
      }
      main();
    `,
  });
}
