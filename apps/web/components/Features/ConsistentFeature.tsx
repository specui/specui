import { JsIcon } from '@/icons/JsIcon';
import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';
import { TsIcon } from '@/icons/TsIcon';

const spec = `
models:
  post:
    attributes:
      title:
        required: true
        type: string
        unique: true
      content:
        required: true
        type: string
  user:
    attributes:
      name:
        type: string
`;

const postsTable = `
import { ColumnType, Generated, sql } from 'kysely'

import { db } from '@/lib/db'

export interface PostsTable {
  id: Generated<number>
  title: string
  content: string
  createdAt: ColumnType<Date, string | undefined, never>
}

export const createPostsTable = async () => {
  await db.schema
    .createTable('posts')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('title', 'varchar(255)', (cb) => cb.notNull().unique())
    .addColumn('content', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('createdAt', sql\`timestamp with time zone\`, (cb) =>
      cb.defaultTo(sql\`current_timestamp\`)
    )
    .execute()
}
`;

const usersTable = `
import { ColumnType, Generated, sql } from 'kysely'

import { db } from '@/lib/db'

export interface UsersTable {
  id: Generated<number>
  name?: string
  createdAt: ColumnType<Date, string | undefined, never>
}

export const createUsersTable = async () => {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)')
    .addColumn('createdAt', sql\`timestamp with time zone\`, (cb) =>
      cb.defaultTo(sql\`current_timestamp\`)
    )
    .execute()
}
`;

export const ConsistentFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Keep your codebase consistent</FeatureTitle>
      <FeatureDescription>
        Maintaining a consistent codebase is hard. But it is the key to efficiency and scalability.
        Naming conventions, design patterns and coding standards are a big part of this. SpecUI
        ensures uniformity across your entire project.
      </FeatureDescription>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {spec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<TsIcon color="white" />}
          title="PostsTable.ts"
        >
          {postsTable}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<TsIcon color="white" />}
          title="UsersTable.ts"
        >
          {usersTable}
        </CodeSnippet>
      </div>
    </div>
  );
};
