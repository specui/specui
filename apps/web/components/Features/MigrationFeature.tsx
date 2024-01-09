import { CodeSnippet } from '../CodeSnippet';

const modelsSpec = `
models:
  user:
    attributes:
      name:
        type: string
      location:
      	type: string
      age:
        type: number
`;

const mongooseCode = `
const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  {
    name: String,
    location: String,
    age: Number
  }
);
`;

const prismaCode = `
model User {
  id       Int     @id @default(autoincrement())
  name     String
  location String
  age      Int
}
`;

const pagesSpec = `
pages:
  home:
    render:
      - h1: Hello, world
`;

const classComponent = `
import { Component } from "react";

class HomePage extends Component {
  render() {
    return <h1>Hello, world</h1>;
  }
}
`;

const functionComponent = `
import { FC } from "react";

const HomePage: FC = () =>
  <h1>Hello, world</h1>;
`;

export const MigrationFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h2 className="mb-2 text-4xl">Breeze through migrations and upgrades</h2>
      <p className="mb-8 text-gray-500 text-xl w-2/3">
        Your needs and dependencies change constantly. It&apos;s easy to fall behind and can even
        bring your app to a sudden hault. ZappJS enables you to effortlessly adapt your existing
        codebase to new standards and upgrades, minimizing manual effort and reducing the scope for
        errors.
      </p>
      <h3 className="mb-4 text-lg">Migrating from Mongoose to Prisma</h3>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {modelsSpec}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="User.js">
          {mongooseCode}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="schema.prisma">
          {prismaCode}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Upgrading from Class Components to Function Components</h3>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet title="spec.yml">{pagesSpec}</CodeSnippet>
        <CodeSnippet title="home.jsx">{classComponent}</CodeSnippet>
        <CodeSnippet title="home.tsx">{functionComponent}</CodeSnippet>
      </div>
    </div>
  );
};
