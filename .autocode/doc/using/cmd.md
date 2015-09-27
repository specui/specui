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