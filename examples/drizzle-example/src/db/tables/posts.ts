import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
  content: varchar(),
  title: varchar(),
});
