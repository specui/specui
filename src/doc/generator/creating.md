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