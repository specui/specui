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

### CLI

The fastest way to create a SpecUI project:

```bash
npx @specui/cli new
npx @specui/cli generate
pnpm install
pnpm dev
```

### VS Code Extension

[Download](https://marketplace.visualstudio.com/items?itemName=specui.specui) the SpecUI extension for VS Code / Cursor

## Docs

Read the docs: https://specui.org/docs

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
