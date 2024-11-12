## SpecUI

### What is SpecUI?

SpecUI is an open-source development tool used to build UIs with specs.

Or, more simply put:

Input: Specs > Output: UIs

### What are specs?

Specs (or "specifications") are documents that describe applications.

The most well-known spec tool is OpenAPI / Swagger, used to describe APIs.

SpecUI, however, uses specs to describe UIs. Here is a basic example:

```yaml
elements:
  - tag: h1
    text: Hello World
  - tag: button
    text: Click me
    onClick:
      alert: 🎉
```

This can be used to generate HTML such as:

```html
<h1>Hello World</h1>
<button onclick="alert('🎉')">Click me</button>
```

YAML, JSON, JS and TS are supported.

### Why specs?

Raw code is error prone, and can be messy and hard to keep up-to-date. If you've ever migrated AngularJS to Angular, Vue 2 to Vue 3, started using React hooks instead of component lifecycle methods, or switched from one framework / UI library to another; you know what I'm talking about.

Specs are guard rails for making your code more efficient and your workflow more streamlined. They also live outside your code so it doesn't add any overhead or latency to your app.

### How Does It Work?

Simply provide SpecUI with a [spec](/components/specs) that outlines your requirements. SpecUI interprets these specs and generates code across multiple languages and frameworks, maintaining best practices, compliance with latest standards, and consistency with your own design patterns.

### Key Features of SpecUI

#### Spec-driven

The specs you provide serve as the blueprint for code generation. These specs allow SpecUI to understand what needs to be generated, ensuring alignment with your project's unique needs.

#### Continuous Code Generation

SpecUI isn't just for one-time setup; it's designed for ongoing use. If you need to make changes to your logic, design patterns, or any code previously generated, SpecUI can update the affected files without you having to manually rewrite them.

#### Design Pattern Consistency

Through spec-driven code generation, SpecUI helps maintain a consistent, modular, and maintainable codebase by adhering to the design patterns specified in your project.

#### Language and Framework Agnostic

SpecUI is designed to be flexible, capable of generating code for a wide variety of programming languages, frameworks, and tools.

#### No Vendor Lock-In

If you decide that SpecUI is no longer suitable for your project, removing it is straightforward. The code that has been generated remains fully functional and can continue to be used independently of SpecUI.

This documentation aims to provide a comprehensive guide to using SpecUI, from initial setup to advanced features and best practices. Whether you're new to code generation tools or an experienced developer, this guide will help you make the most out of SpecUI's capabilities.
