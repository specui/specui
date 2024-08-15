import { JsIcon } from '@/icons/JsIcon';
import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';
import { TsIcon } from '@/icons/TsIcon';
import { PrismaIcon } from '@/icons/PrismaIcon';

const modelsSpec = `
models:
  task:
    attributes:
      id:
        key: primary
        type: number
      description:
        required: true
        type: string
      isCompleted:
        default: false
        type: boolean
pages:
  index:
    elements:
      - tag: ul
        elements:
          model: tasks
          name: task
          key: $task.id
          tag: li
          class: flex justify-between min-w-96
          elements:
            - tag: label
              text: $task.description
              for: isCompleted
            - tag: component
              component: checkbox
              defaultChecked: $task.isCompleted
              name: isCompleted            
`;

const mongooseCode = `
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { type Task, db } from '@/lib/db';

export default function Home({
  tasks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <label htmlFor="isCompleted">{task.description}</label>
          <Checkbox defaultChecked={task.isCompleted} name="isCompleted" />
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = (async (context) => {
  const tasks = await db
    .selectFrom('tasks')
    .selectAll()
    .execute();
  return { props: { tasks } };
}) satisfies GetStaticProps<{
  tasks: Task[]
}>
`;

const prismaCode = `
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { type Task, db } from '@/lib/db';

export default async function Home() {
  const tasks = await db
    .selectFrom('tasks')
    .selectAll()
    .execute();

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <label htmlFor="isCompleted">{task.description}</label>
          <Checkbox defaultChecked={task.isCompleted} name="isCompleted" />
        </li>
      ))}
    </ul>
  );
}
`;

const pagesSpec = `
pages:
  index:
    elements:
      - tag: h1
        text: Hello World
`;

const classComponent = `
import { Component } from "react";

class HomePage extends Component {
  render() {
    return <h1>Hello World</h1>;
  }
}
`;

const functionComponent = `
import { FC } from "react";

const HomePage: FC = () =>
  <h1>Hello World</h1>;
`;

export const MigrationFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Breeze through migrations and upgrades</FeatureTitle>
      <FeatureDescription>
        Your needs and dependencies change constantly. It&apos;s easy to fall behind and can even
        bring your app to a sudden hault. SpecUI enables you to effortlessly adapt your existing
        codebase to new standards and upgrades, minimizing manual effort and reducing the scope for
        errors.
      </FeatureDescription>
      <h3 className="mb-4 text-lg">Upgrading from Class Components to Function Components</h3>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {pagesSpec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<JsIcon color="white" />}
          language="jsx"
          title="home.jsx"
        >
          {classComponent}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<TsIcon color="white" />}
          language="tsx"
          title="home.tsx"
        >
          {functionComponent}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Migrating from Pages to App Router</h3>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {modelsSpec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<TsIcon color="white" />}
          language="tsx"
          title="pages/index.tsx"
        >
          {mongooseCode}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<TsIcon color="white" />}
          language="tsx"
          title="app/page.tsx"
        >
          {prismaCode}
        </CodeSnippet>
      </div>
    </div>
  );
};
