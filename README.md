# Zapp: Continuous Code Generation

> Zapp is currently in **ALPHA**. While we're excited for you to try it, please be advised that it is not yet recommended for use in production environments. Features, specifications, and interfaces are subject to change as we work towards a stable release. Use at your own risk, and we greatly appreciate any feedback to help us improve. Thank you!

## Overview

Zapp is a continuous code generator designed to streamline the development process. Unlike traditional code generators that are mainly used for project scaffolding, Zapp can be used iteratively throughout your project's lifecycle. It's spec-driven, meaning you can define your logic and requirements in a spec file, and Zapp will generate the necessary code.

<img src="https://github.com/zappjs/zappjs/blob/main/images/lifecycle.png" />

## Documentation

Read the full documentation [here](https://zappjs.com).

## Features

- **Continuous Code Generation**: Update existing files based on new specs or logic.
- **Versatile**: Generate everything from UI components to APIs, configurations, and even entire mobile apps.
- **Spec-Driven**: Specs guide what Zapp generates, making sure everything is in line with your requirements.
- **Language Agnostic**: Works across multiple languages and frameworks.

## What Can You Generate?

- Codebases: UIs, APIs, Configurations, Mobile Apps, Games
- Documentation: READMEs, License files, OpenAPI/Swagger
- Other: Models, Routes, Scripts, Workflow Definitions, Tests

## How Does It Work?

Zapp uses a spec to understand what to generate. Specs are versatile, and you can write them in TypeScript, JSON, or YAML. Zapp then processes this spec through various components like Generators, Templates, and Processors to produce the end code.

## License

Zapp is released under the [MIT License](https://github.com/zappjs/zappjs/blob/main/LICENSE).
