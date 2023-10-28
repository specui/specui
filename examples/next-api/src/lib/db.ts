import { createKysely } from '@vercel/postgres-kysely';

import { AuthorsTable, createAuthorsTable } from '../tables/AuthorsTable';
import { CommentsTable, createCommentsTable } from '../tables/CommentsTable';
import { PostsTable, createPostsTable } from '../tables/PostsTable';
import { UsersTable, createUsersTable } from '../tables/UsersTable';

export interface Database {
  Authors: AuthorsTable;
  Comments: CommentsTable;
  Posts: PostsTable;
  Users: UsersTable;
}

export const db = createKysely<Database>();

export const deinit = async () => {
  const tables = ['authors', 'comments', 'posts', 'users'];

  for (let i = 0; i < tables.length; i++) {
    await db.schema.dropTable(tables[i]).ifExists().execute();
  }
};

export const init = async () => {
  await createAuthorsTable();
  await createCommentsTable();
  await createPostsTable();
  await createUsersTable();
};

export const seed = async () => {};
