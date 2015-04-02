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