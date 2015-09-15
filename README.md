# Crystal JS 0.17.7

[![Crystal API](https://img.shields.io/badge/crystal-api-lightgrey.svg?style=flat-square)](https://github.com/crystal/crystal-api)
[![Crystal CLI](https://img.shields.io/badge/crystal-cli-lightgrey.svg?style=flat-square)](https://github.com/crystal/crystal-cli)
[![Crystal JS](https://img.shields.io/badge/crystal-js-brightgreen.svg?style=flat-square)](https://github.com/crystal/crystal)
[![Crystal Hub](https://img.shields.io/badge/crystal-hub-lightgrey.svg?style=flat-square)](https://github.com/crystal/crystal-hub)
[![Crystal Studio](https://img.shields.io/badge/crystal-studio-lightgrey.svg?style=flat-square)](https://github.com/crystal/crystal-studio)
[![Crystal Web](https://img.shields.io/badge/crystal-web-lightgrey.svg?style=flat-square)](https://github.com/crystal/crystal-web)

[![Crystal JS](http://crystal.sh/images/crystal.svg)](http://crystal.sh)

code generator for every language, framework and platform

# Table of Contents

- [Install](#install)
- [Hello World](#hello-world)
- [Usage](#usage)
- [Examples](#examples)
- [API Reference](#api-ref)
- [Official Documentation](#docs)
- [Live Editor](#live-editor)
- [Top 10 Features](#top-10-features)

<a name="install"></a>

# Install

Choose your favorite way to install things:
  
- [npm](#install-npm)
- [GitHub](#install-github)

<a name="install-npm"></a>

## npm

```sh
npm install crystal
```

<a name="install-github"></a>

## GitHub

```sh
git clone https://github.com/crystal/crystal
```

<a name="hello-world"></a>

# Hello World

- [Input](#example-input)
  - [helloworld.js](#hello-world-js)
- [Output](#example-output)
  - [README.md](#readme)
  - [LICENSE](#license)

## Input

Create a file called `helloworld.js` and add these contents:

```js
var Crystal = require('crystal');
var project = new Crystal({
  name: 'My App',
  description: 'This is my app.',
  path: './output/myapp',
  imports: {
    'crystal/license': '~0.2.4',
    'crystal/readme': '~0.2.2'
  },
  outputs: [{
    // generate a LICENSE file
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  },{
    // generate a README.md file
    generator: 'readme.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  }]
});
```

## Output

Now run your `helloworld.js` script:

```sh
node helloworld.js
```

This will create 2 files: README.md and LICENSE

### README.md

```md
# My API

this is my API
```

### LICENSE

```md
The MIT License (MIT)

Copyright (c) 2015 Crystal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

<a name="usage"></a>

# Usage

- [Load Crystal](#load-crystal)
- [Create Project](#create-project)
- [Save Project](#save-project)
- [Load Project](#load-project)
- [Update Project](#update-project)
- [Build Project](#build-project)
- [Run Project](#run-project)
- [Modularize Project](#run-project)

<a name="load-crystal"></a>

## Load Crystal

```js
var Crystal = require('crystal');
```

<a name="create-project"></a>

## Create Project

```js
var project = new Crystal({
  name: 'My App',
  description: 'This is my app.',
  path: './output/myapp',
  imports: {
    'crystal/license': '~0.2.4',
    'crystal/readme': '~0.2.2'
  },
  outputs: [{
    // generate a LICENSE file
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  },{
    // generate a README.md file
    generator: 'readme.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  }]
});
```

<a name="save-project"></a>

## Save Project

```js
project.save();
```

<a name="load-project"></a>

## Load Project

```js
var project = new Crystal('/path/to/project');
```

<a name="update-project"></a>

## Update Project (and its Imports)

```js
project.update();
```

<a name="build-project"></a>

## Build Project

```js
project.build({
  // overwrites any manual changes
  force: true
});
```

<a name="run-project"></a>

## Run Project

```js
project.run();
```

<a name="modularize-project"></a>

## Modularize Project

Modularize your project for other projects to use:

```js
var mod = new Crystal({
  name: 'My Module',
  description: 'This is my module.',
  path: './output/mymod',
  imports: {
    'crystal/handlebars': '~0.2.3'
  },
  exports: {
    ReadmeGenerator: {
      engine: 'handlebars.HandlebarsEngine',
      filename: 'README.md',
      schema: {
        type: 'object',
        properties: {
          name: {
            required: true,
            type: 'string'
          },
          description: {
            required: true,
            type: 'string'
          }
        }
      },
      template: "# {{{name}}}\n\n{{{description}}}",
      type: 'generator'
    }
  }
});
```

<a name="examples"></a>

# Examples

### JavaScript

- [Express](https://crystal.sh/editor/crystal/express)
- [npm](https://crystal.sh/editor/crystal/npm)

### Python

- [Django](https://crystal.sh/editor/crystal/django)
- [pip](https://crystal.sh/editor/crystal/pip)

### Ruby

  - [Rails](https://crystal.sh/editor/crystal/rails)
  
### Other

  - [Docker](https://crystal.sh/editor/crystal/docker)
  - [README](https://crystal.sh/editor/crystal/readme)

<a name="api-ref"></a>

# API Reference

- [build()](#api-ref-build)
- [cache()](#api-ref-cache)
- [generate()](#api-ref-generate)
- [init()](#api-ref-init)
- [install()](#api-ref-install)
- [load()](#api-ref-load)
- [run()](#api-ref-run)
- [search()](#api-ref-search)
- [test()](#api-ref-test)
- [update()](#api-ref-update)
- [validate()](#api-ref-validate)

<a name="api-ref-build"></a>

## build([opts])

Builds your project.

## Options

<table>
  <tr>
    <td>Name</d>
    <td>Type</td>
  </tr>
  <tr>
    <td>`force`</td>
    <td>boolean</td>
  </tr>
</table>

### Example

```js
var project = new Crystal('/path/to/project');
project.build({ force: true });
```

<a name="api-ref-generate"></a>

## generate([opts])

Generates your project's files.

### Options

<table>
  <tr>
    <td>Name</d>
    <td>Type</td>
  </tr>
  <tr>
    <td>`force`</td>
    <td>boolean</td>
  </tr>
</table>

### Example

```js
var project = new Crystal('/path/to/project');
project.generate({ force: true });
```

<a name="api-ref-init"></a>

## init([opts])

Initializes your project.

### Example

```js
var project = new Crystal('/path/to/project');
project.init({
  name: 'My App',
  description: 'This is my app.'
});
```

<a name="api-ref-install"></a>

## install([opts])

Installs a module.

### Example

```js
var project = new Crystal('/path/to/project');
project.install({
  'crystal/readme': '~0.2.2'
});
```

<a name="api-ref-load"></a>

## load([opts])

Loads your project's configuration.

### Example

```js
var project = new Crystal;
project.load('/path/to/project');
```

<a name="api-ref-run"></a>

## run([opts])

Runs your project.

### Example

```js
var project = new Crystal('/path/to/project');
project.run({ force: true });
```

<a name="api-ref-search"></a>

## search([opts])

Search for modules.

### Example

```js
var project = new Crystal('/path/to/project');
project.search({ keywords: 'laravel' });
```

<a name="api-ref-test"></a>

## test([opts])

### Example

```js
var project = new Crystal('/path/to/project');
project.test();
```

<a name="api-ref-update"></a>

Test your project.

## update([opts])

Updates your project.

### Example

```js
var project = new Crystal('/path/to/project');
project.update();
```

<a name="api-ref-validate"></a>

## validate()

Validates your project.

### Example

```js
var project = new Crystal('/path/to/project');
project.validate();
```

<a name="docs"></a>

# Official Documentation

View Crystal's Official Documentation here:

[https://crystal.readme.io](https://crystal.readme.io)

<a name="live-editor"></a>

# Live Editor

Use Crystal Editor to try Crystal online:

[https://crystal.sh/editor](https://crystal.sh/editor)

<a name="top-10-features"></a>

# Top 10 Features

(1) Crystal unifies all technologies with a standardized input written in YAML, JSON, CSON and/or XML.

(2) Crystal generates code for:

  - Any application: APIs, Apps, Websites, Frontends, Backends + more
  - Any language: JavaScript, PHP, Ruby, Python, Swift, Java + more
  - Any framework: Express, Hapi, Laravel, Yii, Rails, Sinatra, Django + more
  - Any platform: Twitter, Facebook, Mailchimp, Pinterest, Google + more
  - Any runtime/server: Node.js, Apache, Nginx, HAPROXY + more
  - Any CMS: Wordpress, Drupal, Joomla, Plone, Keystone + more
  - Any datastore: MySQL, PostgreSQL, Redis, MongoDB, DynamoDB + more
  - Any file: README, LICENSE, AUTHORS, HOSTS + more
  - ...and any other software!!
  
(3) Crystal is made up of 8 elements that make code generation more flexible and powerful than ever before:

  - [Specifications](https://crystal.readme.io/v0.8/docs/specifications)
  - [Schematics](https://crystal.readme.io/v0.8/docs/schematics)
  - [Generators](https://crystal.readme.io/v0.8/docs/generators)
  - [Engines](https://crystal.readme.io/v0.8/docs/engines)
  - [Helpers](https://crystal.readme.io/v0.8/docs/helpers)
  - [Processors](https://crystal.readme.io/v0.8/docs/processors)
  - [Transformers](https://crystal.readme.io/v0.8/docs/transformers)
  - [Injectors](https://crystal.readme.io/v0.8/docs/injectors)
  
(4) Crystal is meant to be used on an ongoing basis - beyond project creation and scaffolding.

(5) Crystal has its own registry (the [Crystal Hub](https://hub.crystal.sh)) and package manager built-in which makes it easy to search, install and update modules.

(6) All of Crystal's elements can be modularized and published to the Crystal Hub for you or others to use.

(7) You can use multiple modules together such as a:

  - README generator for documentation
  - MIT generator for licensing
  - Composer generator for frontend dependencies
  - Bower generator for backend dependencies
  - Laravel generator for business logic
  - Ember generator for UI

(8) You can add/remove modules to/from a project at anytime.

(9) To prevent vendor lock-in and becoming dependent of Crystal, it's kept in its own directory: `.crystal/`. If you wish to no longer use Crystal, simply delete this directory and continue using the generated code (and making changes) without Crystal.

(10) Crystal makes language integration and/or migration easier.

