## Engines

Engines in SpecUI are responsible for processing the templates to generate the final code. They are the runtime that understands your template syntax and merges it with your Specifications to produce the output you desire. This section elaborates on how to effectively utilize and configure Engines in SpecUI.

### What Are Engines?

Engines are the components that interpret Templates in SpecUI. They take a Template and a Specification, combine them, and produce the generated code. SpecUI supports various popular templating engines such as Handlebars, Mustache, and even TypeScript functions.

### Why Use Multiple Engines?

Different projects or components within a project may require different templating languages or functionalities. SpecUI offers the flexibility to choose from various supported engines or even add your own, so you can pick the best tool for the job.

### Configuring Engines

Engines can be configured within your SpecUI project's configuration file. Here's a basic example to configure Handlebars as your templating engine:

```typescript
export const ModelGenerator: IGenerator<IModelSpec> = (spec) =>
  generate({
    // ...
    engine: HandlebarsEngine,
    // ...
  });
```

In this example, we specify that we want to use the Handlebars engine and set some options.

### Built-In vs. Custom Engines

SpecUI comes with several built-in engines for your convenience. However, if you have a specific requirement that the built-in engines do not cover, SpecUI allows you to implement custom engines.

To use a custom engine, you will need to:

1. Define the engine in your project configuration.
2. Implement the engine using TypeScript, making sure it adheres to SpecUI's engine interface.

### Interoperability

Engines are designed to work seamlessly with Templates, Specifications, and Schemas, making it easy to switch between different engines without significantly altering your existing setup.

### Best Practices

When using Engines, consider the following best practices:

- **Understand the Syntax**: Familiarize yourself with the syntax of the engine you're using to make the most out of its features.
- **Efficient Templating**: Choose an engine that best suits your project's complexity. Not all engines are created equal.
- **Consistency**: Where possible, use the same engine across the project for consistency.
- **Documentation**: Keep a well-documented list of configured engines and their options.

By understanding and utilizing Engines efficiently, you enable SpecUI to generate high-quality, consistent, and reliable code, adapted to your specific needs.
