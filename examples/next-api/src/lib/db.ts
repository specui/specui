import { createKysely } from '@vercel/postgres-kysely';

import { AuthorsTable, createAuthorsTable } from '../tables/AuthorsTable';
import { PostsTable, createPostsTable } from '../tables/PostsTable';
import { UsersTable, createUsersTable } from '../tables/UsersTable';

export interface Database {
  Authors: AuthorsTable;
  Posts: PostsTable;
  Users: UsersTable;
}

export const db = createKysely<Database>();

export const deinit = async () => {
  const tables = ['authors', 'posts', 'users'];

  for (let i = 0; i < tables.length; i++) {
    await db.schema.dropTable(tables[i]).ifExists().execute();
  }
};

export const init = async () => {
  await createAuthorsTable();
  await createPostsTable();
  await createUsersTable();
};

export const seed = async () => {};
