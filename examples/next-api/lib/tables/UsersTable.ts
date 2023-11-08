import { ColumnType, Generated, sql } from 'kysely';

import { db } from '@/lib/db';

export interface UsersTable {
  id: Generated<number>;
  username: string;
  password: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export const createUsersTable = async () => {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('username', 'varchar(255)', (cb) => cb.notNull().unique())
    .addColumn('password', 'varchar(255)', (cb) => cb.notNull())
    .execute();
};
