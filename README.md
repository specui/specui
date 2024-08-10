<div align="center">

<a href="https://specui.org">
  <img height="120" src="https://specui.org/logo.png">
</a>

# SpecUI

Build UIs with Specs.

[![License](https://img.shields.io/github/license/specui/specui.svg?style=flat-square)](https://github.com/specui/specui/blob/mistress/LICENSE)
[![npm](https://img.shields.io/npm/v/@specui/core?style=flat-square)](https://npm.im/@specui/core)

<sup>Spec. Preview. Ship.</sup>

</div>

## Overview

SpecUI is a dev tool for writing specs to build user interfaces.

✍️ <b>Write specs</b> in:

- YAML, JSON and JS/TS
- Or use the SpecUI [Visual Editor](https://specui.org/playground)

⚡️ <b>Generate code</b> for:

- Any language: JavaScript, Go, Python, Ruby, Java
- Any framework: Next.js, Astro, Vue, Angular, Gorm, Django
- Any markup/format/other: HTML, JSON, YAML, CSS

## Quickstart

### Online Playground

Go to https://specui.org/playground

### Get Started Locally

The fastest way to create a SpecUI project:

```bash
npx @specui/cli new
```

## Docs

Read the docs: https://specui.org/docs

## Example

Below is a very basic example using the **@specui/next-generator** code generator to generate code for a Next.js app.

### Input (Spec)

```yaml
# yaml-language-server: $schema=/schemas/next-generator-schema.json
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
          - tag: h2
            text: Build at lightning-speed
            class:
              - font-sans-serif
              - font-lg
              - text-center
              - text-gray-400
```

## Features

- **Continuous Code Generation**: Update existing files based on new specs or logic.
- **Spec-Driven**: Specs guide what SpecUI generates, making sure everything is in line with your requirements.
- **Versatile**: Generate everything from UI components to APIs, configurations, and even entire mobile apps.
- **Framework Agnostic**: Use SpecUI to build UIs for React, Vue, Angular and Vanilla JS.

## How Does It Work?

SpecUI uses a spec to understand what to generate. Specs are versatile, and you can write them in TypeScript, JSON, or YAML. SpecUI then processes this spec through various components like Generators, Templates, and Processors to produce the end code.

<img src="https://github.com/specui/specui/blob/main/images/lifecycle.png" />

## License

SpecUI is released under the [MIT License](https://github.com/specui/specui/blob/main/LICENSE).
