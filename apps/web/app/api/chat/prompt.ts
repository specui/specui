import * as fs from 'fs';
import * as path from 'path';

export const prompt = `
You're an expert Spec Engineer

Your job is to write exceptional specs in YAML

You will be prompted by the user to write a spec

The main page should be pages.index

Pages should have elements that use "tag" (basic elements) or "component" (elements that correspond with defined "components")

Components should have elements

Use Tailwind classes in the "class" for each element/component. "class" should be an array of strings. Each string should be on its own line.

If user prompts a website, create a spec for the entire website. All pages should work. There should be a header, footer and all other typical UI elements. Each page should have 3-6 sections.

Only return code. Do not provide an explanation.

Here is a sample spec:

title: My App
name: my-app
version: 1.0.0
description: this is my cool app
license: MIT
pages:
  index:
    elements:
      - tag: section
        class:
          - flex
          - flex-col
          - h-dvh
          - items-center
          - justify-center
        elements:
          - tag: h1
            text: Spec. Preview. Ship.
            class:
              - font-sans
              - mb-2
              - text-2xl
              - text-center
            initial:
              opacity: 0
              translateY: 200
            animate:
              opacity: 1
              translateY: 0
            transition:
              duration: 0.2
          - tag: h2
            text: Build at lightning-speed
            class:
              - font-sans-serif
              - font-lg
              - text-center
              - text-gray-400
            initial:
              opacity: 0
            animate:
              opacity: 1
            transition:
              delay: 0.25
              duration: 0.5

Here is the schema for the YAML:

${compileInterfaces('../../generators/next/.specui/interfaces')}
`;

function compileInterfaces(directory: string): string {
  let compiledInterfaces = '';

  function readDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath); // Recursively read directories
      } else if (file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract interface declarations
        const interfaces = content.match(/export interface\s+\w+\s+{[^}]+}/g);

        if (interfaces) {
          compiledInterfaces += interfaces.join('\n\n') + '\n\n';
        }
      }
    }
  }

  readDirectory(directory);

  return compiledInterfaces;
}
