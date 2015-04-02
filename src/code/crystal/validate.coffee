# load deps
findVersions = require 'find-versions'

validate = (config) ->
  # load config
  config = config || this.config
  
  fields = {
    copyright: {
      type: 'string'
    }
    description: {
      type: 'string'
    }
    name: {
      required: true
      type: 'string'
    }
    version: {
      validate: (val) ->
        if typeof findVersions(val, { loose: true })[0] == 'string'
          true
        else
          false
      required: true
      type: 'string'
    }
  }
  
  for field_name of fields
    field = fields[field_name]
    value = config[field_name]
    
    switch
      when field.required == true and (value == undefined or value == null)
        throw new ErrorRequired field_name
      when value != undefined
        switch
          when typeof value != field.type
            throw new ErrorType field_name, field.type
          when field.validate && field.validate(value) == false
            throw new ErrorInvalid field_name
    
        # else if !findVersions(config.version, { loose: true })[0]
module.exports = validate