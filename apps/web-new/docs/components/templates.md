## Templates

Templates serve as the blueprint for code generation in SpecUI, dictating the structure and format of the output. This section aims to provide you with a comprehensive understanding of how to effectively use Templates in SpecUI.

### What Are Templates?

Templates are pre-defined code snippets that serve as a mold for generating specific parts of your codebase. These are the basic building blocks used by Generators to create code based on your Specifications.

### Why Use Templates?

Utilizing Templates brings several benefits to your code generation workflow:

- **Standardization**: Ensures consistent structure and coding standards across the codebase.
- **Efficiency**: Speeds up the development process by reducing repetitive tasks.
- **Flexibility**: Allows you to easily customize the generated code to suit specific requirements.

### Configuring Processors

To configure Templates in your SpecUI project, you need to define them with the `template` property in your generators's configuration. Here's a basic example of how to configure a Processor:

```typescript
export const ModelGenerator: IGenerator<IModelSpec> = (spec) =>
  generate({
    // ...
    template: 'model.hbs',
    // ...
  });
```

### Defining Templates

Templates can be written using various template engines like Handlebars, Mustache, or TypeScript. The choice of the engine depends on your project's needs and your familiarity with the template syntax.

Here's a simple Handlebars example:

```handlebars
class
{{className}}
{ constructor() {
{{#each properties}}
  this.{{name}}
  =
  {{defaultValue}};
{{/each}}
} }
```

This Handlebars template generates a TypeScript class with the specified class name and properties.

### Using Templates with Specifications and Schemas

In SpecUI, Templates often rely on Specifications and Schemas for contextual data. The template engine uses this data to fill in the placeholders and generate code that aligns with the defined schema.

### Custom Templates

Although SpecUI offers a range of built-in templates, you may need to create custom templates for more complex or specialized scenarios. You can create custom templates using your preferred template engine and import them into your SpecUI project.

### Best Practices

When working with Templates, consider the following best practices:

- **Keep it Simple**: Templates should be straightforward and easy to understand.
- **Reusable Components**: Aim to build reusable template blocks to maintain consistency and reduce redundancy.
- **Comments**: Use comments to annotate the templates, making it easier for others to understand the template structure and purpose.
- **Validation**: Test your templates against different Specifications and Schemas to ensure they generate the expected output.

By adhering to these best practices, you can make the most out of Templates in SpecUI, thereby improving the efficiency and consistency of your code generation process.
