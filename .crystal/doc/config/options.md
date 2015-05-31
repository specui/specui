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