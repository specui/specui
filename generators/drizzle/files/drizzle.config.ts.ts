import { generate } from '@specui/core';
import { HandlebarsEngine } from '@specui/handlebars';
import { PrettierProcessor } from '@specui/prettier';

export default async function DrizzleConfigGenerator() {
  return await generate({
    engine: HandlebarsEngine,
    processor: PrettierProcessor(),
    template: /* ts */ `
      import 'dotenv/config';
      import { defineConfig } from 'drizzle-kit';

      export default defineConfig({
        out: './drizzle',
        schema: './src/db/schema.ts',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      });
    `,
  });
}
