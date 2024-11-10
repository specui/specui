import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  firstName: varchar(),
  lastName: varchar(),
  age: integer(),
  location: varchar(),
});
