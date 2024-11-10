import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const commentsTable = pgTable('comments', {
  message: varchar(),
});
