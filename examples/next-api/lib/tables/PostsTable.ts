import { ColumnType, Generated, sql } from 'kysely';

import { db } from '@/lib/db';

export interface PostsTable {
  id: Generated<number>;
  name: string;
  slug: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export const createPostsTable = async () => {
  await db.schema
    .createTable('posts')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull().unique())
    .addColumn('slug', 'varchar(255)', (cb) => cb.notNull().unique())
    .execute();
};
