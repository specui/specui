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