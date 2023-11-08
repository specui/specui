import { createKysely } from '@vercel/postgres-kysely';

import { AuthorsTable, createAuthorsTable } from '@/lib/tables/AuthorsTable';
import { CommentsTable, createCommentsTable } from '@/lib/tables/CommentsTable';
import { PostsTable, createPostsTable } from '@/lib/tables/PostsTable';
import { UsersTable, createUsersTable } from '@/lib/tables/UsersTable';

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
