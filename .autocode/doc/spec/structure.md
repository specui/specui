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