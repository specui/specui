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