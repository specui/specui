import { Metadata } from 'next';

import { TypingEffect } from '@/components/TypingEffect';
import { CopyAll } from '@mui/icons-material';
import Bg from '@/components/Bg';
import { Install } from '@/components/Install';

export const metadata: Metadata = {
  title: 'Home - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og'],
    siteName: 'SpecUI',
    title: 'Home - SpecUI',
    description: 'Build UIs with Specs',
    url: 'https://specui.org/',
  },
};

const HomeSpec = `title: Todo
name: todo-list
description: a simple to-do list example
database:
  type: mongodb
actions:
  createTask:
    props:
      description:
        required: true
        type: string
    operations:
      - type: insert
        model: task
        data:
          description: $props.description
          isCompleted: false
      - type: revalidate
        path: /tasks
  deleteTask:
    props:
      id:
        required: true
        type: number
    operations:
      - type: delete
        model: task
        where:
          id: $props.id
      - type: revalidate
        path: /tasks
  updateTask:
    props:
      id:
        required: true
        type: number
      description:
        required: true
        type: string
      isCompleted:
        required: true
        type: string
    operations:
      - type: update
        model: task
        data:
          description: $props.description
          isCompleted: $props.isCompleted
        where:
          id: $props.id
      - type: revalidate
        path: /tasks
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
components:
  input:
    props:
      className:
        type: string
      label:
        type: string
      name:
        type: string
      placeholder:
        type: string
      value:
        type: string
    elements:
      - tag: label
        text: $props.label
      - tag: input
        class: p-2 rounded-lg text-black $props.className
        name: $props.name
        placeholder: $props.placeholder
        value: $props.value
pages:
  /:
    dataSources:
      tasks:
        type: model
        model: tasks
    elements:
      - tag: div
        class: flex flex-col gap-2 items-center justify-center min-h-dvh
        elements:
          - tag: h2
            text: My Tasks
            class: text-2xl text-white
          - tag: ul
            class: flex flex-col gap-2
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
                  defaultChecked: $Boolean(task.isCompleted)
                  name: isCompleted
          - tag: form
            action: createTask
            elements:
              - tag: component
                component: Input
                name: description
                placeholder: Enter a new task
              - tag: button
                class: px-2
                text: Add
`;

export default function Home() {
  return (
    <>
      <Bg />
      <main
        className="flex flex-col gap-4 items-center justify-center px-4 py-8"
        style={{ minHeight: 'calc(50vh - 65px)' }}
      >
        <h1 className="text-6xl text-center">Build apps with YAML</h1>
        <p className="text-md text-center md:text-lg">
          Say goodbye to syntax errors, minimize dependency management &amp; simplify migrations
        </p>
        <div className="flex gap-4">
          <a className="border border-black px-4 py-2 rounded-2xl dark:border-white" href="/docs">
            Learn More
          </a>
          <Install />
        </div>
      </main>
      <div className="flex items-center justify-center mb-32 px-4">
        <div className="bg-black border rounded-xl max-w-4xl w-full">
          <div className="border-b flex gap-2 p-4">
            <div className="border h-4 rounded-full w-4" />
            <div className="border h-4 rounded-full w-4" />
            <div className="border h-4 rounded-full w-4" />
          </div>
          <pre className="overflow-hidden p-4 text-xs">
            <TypingEffect speed={0.5} text={HomeSpec} />
          </pre>
        </div>
      </div>
    </>
  );
}
