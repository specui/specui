## Specs (Specifications)

Specifications (or "Specs") are the heart of the SpecUI code generation lifecycle. Specs are the instructions that guide the Generators in creating the code you need. They determine the logic, structure, and even metadata for the generated code. This section aims to provide a comprehensive understanding of how to work with Specs in SpecUI effectively.

### What Are Specs?

Specs are configuration files or code snippets that capture the requirements for the code you want to generate. These can define anything from the architecture of an application, to database schema, to individual class and function implementations.

The primary use cases for Specs include:

- Defining application architecture and logic.
- Specifying data models and their relationships.
- Declaring configuration or environment variables.
- Setting up code design patterns and reusable modules.

### Creating Specs

Creating Specs is the first step in using SpecUI for your project. The Specs can be written in YAML, JSON, TypeScript and JavaScript.

#### YAML Example

YAML is the default format. It is human-readable and easy to implement.

**.specui/spec.yml**

```yaml
$generator: '@specui/next-generator'
pages:
  index:
    elements:
      - tag: div
        text: Hello world
```

#### TypeScript Example

For advanced scenarios, TypeScript might be a better way to go. Specs written in TS can also be broken up into multiple files.

**.specui/spec.ts**

```typescript
import { Spec } from "@specui/next-generator";
import { IndexPage } from "./pages";

const spec: Spec & {
  $generator: string;
} = {
  $generator: "@specui/next-generator",
  name: "test",
  pages: {
    index: IndexPage,
  },
};

export default spec;
```

**.spectui/pages/index.ts**

```typescript
import type { Page } from "@specui/next-generator";

export const IndexPage: Page = {
  elements: [
    {
      tag: "div",
      text: "Hello world",
    },
  ],
};
```

In this example, the Spec defines a data model with its fields and a controller with its actions.

### Built-in and Custom Specs

SpecUI provides some built-in Specs to get you started quickly. These cover common scenarios like CRUD operations, RESTful APIs, or MVC architectures. However, you can also create custom Specs tailored for your specific requirements.

### Validating Specs with Schemas

To ensure the integrity and correctness of Specs, SpecUI uses Schemas based on JSON Schema. These Schemas validate the Spec files to ensure they meet the required format and contain the necessary attributes.

### Organizing Specs in SpecUIs

In a typical SpecUI project, you may have multiple Specs for different aspects of your application. These Specs can be organized under a single SpecUI for better modularity and easier management.

### Best Practices

When working with Specs in SpecUI, consider the following best practices:

- Keep your Specs as modular and focused as possible.
- Use Schemas to validate Specs rigorously for consistency and integrity.
- Continuously update Specs as your project requirements evolve to keep the generated code up-to-date.

By mastering Specs, you take a significant step toward leveraging SpecUI's full potential in automating your code generation process, thereby keeping your project agile and maintainable.
