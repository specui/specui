import { ColumnType, Generated, sql } from 'kysely';

import { db } from '@/lib/db';

export interface AuthorsTable {
  id: Generated<number>;
  name: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export const createAuthorsTable = async () => {
  await db.schema
    .createTable('authors')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull().unique())
    .execute();
};
