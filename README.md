# Crystal v0.3.2 (Quartz)

[![npm version](https://badge.fury.io/js/crystal.svg)](http://badge.fury.io/js/crystal) [![Build Status](https://travis-ci.org/studiotate/crystal-js.svg?branch=master)](https://travis-ci.org/studiotate/crystal-js)

[![image_alt](http://crystal.sh/images/crystal.svg)](http://crystal.sh)

Crystal is an open source code generator for every language and platform.

Have a quick question? Let us answer on  [Twitter](http://twitter.com/crystalcodegen) and [Facebook](http://facebook.com/crystalcodegen).

# Installation

## Prerequisites

Crystal requires [Node.js](http://nodejs.com) and [npm](http://npmjs.com).


## Install

```sh
$ npm install crystal -g
```

The option `-g` installs `crystal` globally so you can run `crystal` from any directory.



# Features

Crystal is a fully customizable metaprogramming engine that:

- uses high level specifications and low level generators to help you build apps, websites and other software for any programming language

- is meant to be used on an ongoing basis beyond project creation

- allows multiple generators to be added (or removed) to a project or another generator at anytime

- has its own built-in package manager so you can easily search, install and update generators

- allows you to create your own generators

- allows you to publish generators for others to use

- uses a standardized specification

- allows additional specifications when creating generators

- makes language integration and migration easier



# Using Crystal

## Command Line Interface

Once [installed](/docs#installation), `crystal` runs as a CLI program.

Note: be sure to install `crystal` with the `-g` option to ensure it is installed globally and can be used for any directory.


## Usage

`crystal` accepts the commands and arguments below.

Required arguments are surrounded by tags `<>` and optional arguments are surrounded by brackets `[]`.

If a command accepts the `dir` argument and no `dir` is specified, it uses the current working directory.

Note: Commands that use the `dir` argument are looking for a [Crystal Config](#crystal-config-file) file.

```sh
# build project from current or specified directory
crystal build [dir]

# read/write value from/to cache
crystal cache key [value]

# clean project from current or specified directory
crystal clean [dir]

# get or set default value
crystal default [key] [value]

# get help
crystal help

# initialize a crystal project
crystal init [dir]

# install a generator
crystal install <generator>

# publish project from current or specified directory
crystal publish [dir]

# run project from current or specified directory
crystal run [dir]

# search for public generators
crystal search <generator>

# signup for crystal
crystal signup

# run tests for generator
crystal test

# update generators for project
crystal update

# update project version
crystal version <major|minor|patch>
```



# Projects

## Difference Between Project & Generator

There are many ways to use `crystal` but the two most common scenarios are:

- using `crystal` for your projects
- using `crystal` to create generators


## Using `crystal` for Your Projects

`crystal` is powerful. It has several generators to choose from and helps you bootstrap your projects in no time.

But it doesn't stop there. `crystal` is meant to be used for projects on an ongoing basis. It helps you deliver high quality code for every story, every sprint and every epic. It's there for launch, maintenance and upgrades.

If you are happy using `crystal` to make robust apps (or save the world), then use it for your projects and enjoy the generators made by the wonderful community of `crystal`.


## Using `crystal` to Create Generators

If you haven't found the right one. Or if you could do it better. Or just want to give a whirl:

Try creating a generator for you favorite language, framework or even your own custom code.

Generators are projects that are meant to be used as generators. In other words, a project is a project unless it:

- contains a `gen` key in the Crystal Config File
- contains a `gen` folder in the Crystal Source Directory (default: `./src`)

Once this has been done, the `crystal` project can then be used a generator for other projects. Or generators. Or itself.

If you want to share it with the world, then you'll also need to:

- create at least one test for the generator (in `/src/test`)
- publish it to [crystal.sh](http://crystal.sh) using: `crystal publish`



# Project Structure

## Files & Folders

Below are all of the folders that can be used by `crystal`.

Note: The only required file is a Crystal Config File (default: `crystal.yml`).

- `lib/` - output directory (where generators push to)
- `src/` - source directory (where generators pulls from)
  - `code/` - code files
  - `doc/` - documentation files
    - `$chapter_name` - name of a chapter
    - `$page_name` - name of a page
  - `gen/` - gen files used for generators
    - `$gen_file.hbs` a generator file
  - `spec/` - spec files that describe the project
    - `model/`
      - `$model_name.yml` - name of a model
- `crystal.yml` - crystal config file



# Project Configuration

## Crystal Config File

In order for your project to properly integrate with `crystal`, a config file must be added to a directory in your project (preferably in the project's root directory).

It can be created in the following formats:

- YAML
- CSON
- JSON
- XML

Discovery of this file happens in the following order:

- `crystal.yml`
- `crystal.yaml`
- `crystal.cson`
- `crystal.json`
- `crystal.xml`

For example, if you had both a `crystal.yml` file and `crystal.cson` file, only the `crystal.yml` would be loaded.

The only required fields in the crystal config file are `name:` and `version:`. Everything else is optional.


## Add Crystal to New Project

Adding `crystal` to a new project is easy.


## Add Crystal to Existing Project

Adding `crystal` to an existing project is as easy as adding it to a new project.


## Crystal Config Options

The options below can be used for the Crystal Config File:

```yaml
# the project's name (required)
name:

# the project's version, must be semver 2.0 compliant (required)
version:

# the project's description (required)
description:

# true or false
private:

# the chief author's name, email & url
author:
  name:
  email:
  url:

# the project's copyright (example: 2015 Acme, Inc.)
copyright:

# the project's documentation
doc:
  $chapter-name:
    title: # the chapter's title
    pages:
      $page-name:
        title: # the page's title

# the project's repository
repository:
  type: # git or svn
  url:

# the project's generator
gen:
  file:
    $file: # name of the file (without the extension)
      dest: # the destination of the file, use '.' for root (default: lib)
      mapping:
        model:
          details:
            name:
              format:
                case: '<camel|lower|proper|upper>' (lowercase)
                spacing: '<dash|none|underscore>' (underscore)
            type:
              bool: <'DETAIL_TYPE'|false>
              date: <'DETAIL_TYPE'|false>
              decimal: <'DETAIL_TYPE'|false>
              image: <'DETAIL_TYPE'|false>
              model: <'DETAIL_TYPE'|false>
              number: <'DETAIL_TYPE'|false>
              string: <'DETAIL_TYPE'|false>
              time: <'DETAIL_TYPE'|false>
          name:
            format:
              case: '<camel|lower|proper|upper>'
              spacing: '<dash|none|underscore>'
  spec: # custom spec
    $field_name: # add custom field with unique name
      required: <true|false>
      type: '<option|string>'

# the generators used by the project (yes, generators can use other generators)
generators:
  $generator_name: # add generator by name
    pass: set to `true` to skip this generator when used by another generator (pass to projects that use this generator instead)
    path: # the path used for the generator's output (the default is 'lib')
    spec: # spec variables to pass to the generator
    version: # the version of the generator to be used

# languages based on generator's output
languages: # optional
  - <csharp|go|java|js|nodejs|php|python|ruby|other>

# scripts ran for specific commands
scripts:
  build:
    - $cmd # example - npm update
  run:
    - $cmd
  test:
    - $cmd
```



# Project Specification

## Crystal Spec


## Directory Structure

The Directory Structure for the spec is like:

```ruby
# usage
- model/
  - $model_name.$model_format

# example
- model/
  - order.yml
  - product.yml
  - user.yml
```

Each file has the following options:

### Config Variables

Config Variables are defined in the Crystal Config File and can be used at any level within the document.

```ruby
{{@name}} string
{{@version}} string
{{@description}} string
{{@private}} bool

{{@author}} object
  {{@author.name}} string
  {{@author.email}} string
  {{@author.url}} string

{{@copyright}} string

{{@repository}} object
  {{@repository.type}} string
  {{@repository.url}} string
```

### Spec Variables

```ruby
# model
{{model}}
  {{$model_name}} object
```


## Processing



# Generators

## What Are Generators?

Generators generate code.

Some are big and produce entire libraries for Restful APIs, models and other robust services. Others are small and only produce a single file such as a [README.md](/gen/readme), [AUTHORS](/gen/authors) or [.gitignore](/gen/gitignore) file.

They can work together or alone. They can have one purpose or many. They can be public or private. And they can be created from scratch or added to an existing project.

Generators are what make `crystal` useful to you and others. So use them. Make them. Make a lot of them. Then make generators for your generators and generators for your generators' generators.


## Loading Generators

Loading generators is easy and can happen in a few ways.

### Loading Generators via Crystal Config

Usually generators are added to your project's crystal config such as this [readme](/gen/readme) generator:

```yaml
# crystal config
generators:
  readme:
    version: latest
```

Then update your crystal project:

```sh
# example
cd $PROJECT_PATH
crystal update
```

This is the quick way to add a generator to your project and use it.

### Loading Generators via Command Line

If you'd like to load a generator manually, you can do so by running:

```sh
# usage
crystal install <generator>
# example
crystal install readme
```

This will install the generator to your crystal home directory (set as `~/.crystal` by default).

This is useful for checking out the source code for a generator before using it.


## Creating Generators

Creating Generators puts you in control of code generation.

Generators use Handlebars syntax and are processed through a series of code templates & configurations to produce source code.

## Why Create Code Generators?

### Create Unique Generators

Whether you wish to create a completely unique generator or fine-tune an existing generator, creating generators allows you full control of the code that is produced.

#### Django Configuration Example

Below is an example `crystal.cson` file for the [Django](http://djangoproject.com) framework which defines `python` as a language, `model` as a pattern and the mapping for various types of details.

Since this example does not include the `iterator` option, each model is compiled into a single file named `models.py`.

```yaml
languages:
	- python
gen:
	file:
		dest: models.py
		models:
			mapping:
				model:
					details:
						type:
							bool: BooleanField
							date: DateField
							decimal: DecimalField
							image: ImageField
							model: ForeignKey
							number: IntegerField
							string: CharField
							time: DateTimeField
```

#### Doctrine Configuration Example

Below is an example `crystal.cson` file for the [Doctrine](http://doctrine-project.org) framework which defines `php` as a language, `model` as a pattern and does not include mapping of detail types, since Doctrine doesn't use these.

Since Doctrine defines each model in a separate file, the `files` object is used to place each file in the `model/` directory.

```yaml
files:
	model:
		data: models
		dest: "models/{{name.pascal}}.php"
languages:
	- php
patterns:
	- model
```

## Code Generation

### Directory Structure

```
gen/
	. (GENERATOR files)
crystal.cson
```

### Data Structures

#### Parent Data Structure

Here are the available options for each project:

	{{author}} object
		{{email}} string
		{{name}} string
	{{model}}
		{{MODEL_NAME}} object
			.. (same options as {{models}})
	{{models}} array
		{{detail}} object
			{{DETAIL_NAME}} object
				.. (same options as {{models.details}})
		{{details}} array
			{{max}} object
				{{length}} integer
				{{number}} integer
			{{min}} object
				{{length}} integer
				{{number}} integer
			{{name}} string
			{{required}} boolean
			{{type}} string
			{{unique}} boolean
		{{has}} object
			{{DETAIL_NAME}} boolean
		{{name}} string
	{{project}} object
		{{copyright}} string
		{{description}} string
		{{name}} string

#### `models` Data Structure

The `models` Data Structure is useful when iterating models over multiple files.

	{{author}} object
		{{email}} string
		{{name}} string
	{{detail}} object
		{{DETAIL_NAME}} object
			.. (same options as {{models.details}})
	{{details}} array
		{{max}} object
			{{length}} integer
			{{number}} integer
		{{min}} object
			{{length}} integer
			{{number}} integer
		{{name}} string
		{{required}} boolean
		{{type}} string
		{{unique}} boolean
		{{has}} object
			{{DETAIL_NAME}} boolean
	{{name}} string
	{{project}} object
		{{copyright}} string
		{{description}} string
		{{name}} string


