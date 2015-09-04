# Crystal 0.16.0

[![npm version](https://badge.fury.io/js/crystal.svg)](http://badge.fury.io/js/crystal)
[![Build Status](https://travis-ci.org/crystal/crystal.svg?branch=master)](https://travis-ci.org/crystal/crystal)
[![Join the chat at https://gitter.im/crystal/crystal](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/crystal/crystal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Crystal](http://crystal.sh/images/crystal.svg)](http://crystal.sh)

code generator for every language, framework and platform

# Install

Use [npm](https://npmjs.com) to install [Crystal](https://crystal.sh):
  
```sh
npm install crystal
```

# Example

```js
var Crystal = require('crystal');

// create project
var project = new Crystal({
  name: 'My API',
  description: 'this is my API',
  path: './myapi',
  imports: {
    'crystal/license': '~0.2.4',
    'crystal/readme': '~0.2.2'
  },
  outputs: [{
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  },{
    generator: 'readme.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  }]
});

// update project (and its imports)
project.update();

// build project
project.build({ force: true });

// run project
project.run();
```

# Output

## README.md

```md
# My API

this is my API
```

## LICENSE

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

# Usage

- Crystal#build
- Crystal#cache
- Crystal#generate
- Crystal#init
- Crystal#install
- Crystal#load
- Crystal#run
- Crystal#search
- Crystal#test
- Crystal#update
- Crystal#validate

# Official Documentation

View Crystal's Official Documentation here:

[https://crystal.readme.io](https://crystal.readme.io)

# Live Editor

Use Crystal Editor to try Crystal online:

[https://crystal.sh/editor](https://crystal.sh/editor)

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

