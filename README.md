<div align="center">

<a href="https://zappjs.com">
  <img height="120" src="https://zappjs.com/logo.png">
</a>

# ZappJS

Write specs. Generate code.

[![License](https://img.shields.io/github/license/zappjs/zappjs.svg?style=flat-square)](https://github.com/zappjs/zappjs/blob/mistress/LICENSE)
[![npm](https://img.shields.io/npm/v/@zappjs/core?style=flat-square)](https://npm.im/@zappjs/core)

<sup>Spec. Preview. Ship.</sup>

</div>

## Overview

ZappJS is a continuous, spec-driven code generator.

✍️ <b>Write specs</b> in:
- YAML, JSON and JS/TS
- Or use the ZappJS [Visual Editor](https://zappjs.com/playground)

⚡️ <b>Generate code</b> for:
- Any language: JavaScript, Go, Python, Ruby, Java
- Any framework: Next.js, Astro, Vue, Angular, Gorm, Django
- Any markup/format/other: HTML, JSON, YAML, CSS

## Quickstart

### Online Playground

Go to https://zappjs.com/playground

### Get Started Locally

The fastest way to create a Zapp-enabled project:

```bash
npx create-zapp-app@latest
```

## Docs

Read the docs: https://zappjs.com/docs

## Example

Below is a very basic example using the **next-zapp** code generator to generate code for a Next.js app.

### Input (Spec)

```yaml
name: ecto-1-blog
version: 1.0.0
description: Scribbles by an Ex-Ghostbuster.
license: MIT
author:
  name: Louis Tully
  email: louis.tully@example.org
  url: https://example.org/
auth:
  providers:
    - github
    - google
    - facebook
models:
  post:
    attributes:
      id:
        key: primary
        type: number
      name:
        unique: true
        type: string
      slug:
        unique: true
        type: string
```

### Output (Code)

```
app/
  api/
    auth/
      [...nextauth]/
        route.ts
    createPost/
      route.ts
    deletePost/
      route.ts
    getPost/
      route.ts
    listPosts/
      route.ts
  auth.ts
  globals.css
  layout.tsx
  page.tsx
lib/
  errors/
    BadRequestError.ts
    ConflictError.ts
    ForbiddenError.ts
    HttpError.ts
    MethodNotAllowedError.ts
    NotFoundError.ts
    UnauthorizedError.ts
    UnprocessableContentError.ts
  schemas/
    createPostSchema.ts
    deletePostSchema.ts
    getPostSchema.ts
    listPostsSchema.ts
  tables/
    PostsTable.ts
  client.ts
  db.ts
public/
  next.svg
  vercel.svg
.eslintrc.json
.gitignore
LICENSE
next.config.js
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.json
```

## Features

- **Continuous Code Generation**: Update existing files based on new specs or logic.
- **Spec-Driven**: Specs guide what Zapp generates, making sure everything is in line with your requirements.
- **Versatile**: Generate everything from UI components to APIs, configurations, and even entire mobile apps.
- **Language Agnostic**: Works for all programming languages and frameworks.

## What Can You Generate?

- Codebases: UIs, APIs, Configurations, Mobile Apps, Games
- Documentation: READMEs, License files, OpenAPI/Swagger
- Other: Models, Routes, Scripts, Workflow Definitions, Tests

## How Does It Work?

Zapp uses a spec to understand what to generate. Specs are versatile, and you can write them in TypeScript, JSON, or YAML. Zapp then processes this spec through various components like Generators, Templates, and Processors to produce the end code.

<img src="https://github.com/zappjs/zappjs/blob/main/images/lifecycle.png" />

## License

Zapp is released under the [MIT License](https://github.com/zappjs/zappjs/blob/main/LICENSE).
