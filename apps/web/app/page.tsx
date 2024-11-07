import { Metadata } from 'next';

import { Playground } from '@/components/Playground/Playground';
import { safeDump } from 'js-yaml';

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

const HomeSpec = `
title: Todo
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
        class:
          - p-2 rounded-lg text-black
          - $props.className
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
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Playground generator="next" spec={HomeSpec.trim()} />
    </main>
  );
}
