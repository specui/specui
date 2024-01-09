import { JsIcon } from '@/icons/JsIcon';
import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';

const apiSpec = `
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

const apiCode = `
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

const websiteSpec = `
props:
  name:
    default: world
    type: string
render:
  - h1:
      class:
        - text-bold
        - text-2xl
        - text-white
      text: Hello, {name}
`;

const websiteCode = `
import { FC } from "react";

interface Props {
  name?: string;
}

const Greeting: FC<Props> = ({ name = 'world' }) => {
  return (
    <h1 className="text-bold text-2xl text-white">
      Hello, {name}
    </h1>
  );
}
`;

const cliSpec = `
name: string-util
description: CLI to some JavaScript string utilities
version: 0.8.0
commands:
  split:
    description: Split a string into substrings and display as an array
    arguments:
      - description: string to split
        type: string
    options:
      - flag: --first
        description: display just the first substring
      - flag: -s, --separator <char>
        description: separator character
        default: ,
`;

const cliCode = `
const { Command } = require('commander');

const splitAction = require('./actions/split');

const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action(splitAction);

program.parse();
`;

export const BuildFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Build anything</FeatureTitle>
      <FeatureDescription>
        Apps, websites, APIs, desktop applications, CLI tools, games. Anything you can code
        manually, you can use ZappJS to generate all or part of your codebase.
      </FeatureDescription>
      <h3 className="mb-4 text-lg">Generate models for an API</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {apiSpec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-2 md:col-span-1"
          icon={<JsIcon color="white" />}
          title="User.js"
        >
          {apiCode}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Generate pages for a website</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {websiteSpec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-2 md:col-span-1"
          icon={<JsIcon color="white" />}
          title="home.jsx"
        >
          {websiteCode}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Generate a CLI program</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {cliSpec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-2 md:col-span-1"
          icon={<JsIcon color="white" />}
          title="home.jsx"
        >
          {cliCode}
        </CodeSnippet>
      </div>
    </div>
  );
};
