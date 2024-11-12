import { createKysely } from '@vercel/postgres-kysely';

export interface Database {}

export const db = createKysely<Database>();

export const deinit = async () => {
  const tables = [];

  for (let i = 0; i < tables.length; i++) {
    await db.schema.dropTable(tables[i]).ifExists().execute();
  }
};

export const init = async () => {};

export const seed = async () => {};
