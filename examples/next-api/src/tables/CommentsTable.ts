import { ColumnType, Generated, sql } from 'kysely';

import { db } from '../lib/db';

export interface CommentsTable {
  postId: number;
  message: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export const createCommentsTable = async () => {
  await db.schema
    .createTable('comments')
    .ifNotExists()
    .addColumn('postId', 'integer', (cb) => cb.notNull())
    .addColumn('message', 'varchar(255)', (cb) => cb.notNull())
    .execute();
};
