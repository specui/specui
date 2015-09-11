path = require 'path'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

global.ErrorInvalid = (name, type) ->
  this.name = 'ErrorInvalid'
  this.message = "'#{name}' is invalid."
global.ErrorInvalid.prototype = Error.prototype

global.ErrorType = (name, type) ->
  this.name = 'ErrorType'
  this.message = "'#{name}' must be of type (#{type})."
global.ErrorType.prototype = Error.prototype

global.ErrorRequired = (name) ->
  this.name = 'ErrorRequired'
  this.message = "'#{name}' is required."
global.ErrorRequired.prototype = Error.prototype

crystal = (config) ->
  
  # define methods
  methods = [
    'build'
    'cache'
    #'clean'
    #'data'
    #'default'
    #'format'
    'generate'
    #'info'
    'init'
    'install'
    #'link'
    'load'
    #'publish'
    #'process'
    'run'
    'save'
    'search'
    #'signup'
    #'spec'
    'stop'
    'test'
    'update'
    #'url'
    'validate'
    #'version'
  ]
  
  # load methods
  for method in methods
    this[method] = require "./crystal/#{method}"
  
  if typeof(config) == 'object'
    validate = this.validate config
    if !validate.valid
      if validate.errors[0].message == 'Failed "type" criteria: expecting string, found object'
        throw new Error "'#{validate.errors[0].context.substr(2)}' must be of type (string)."
      else if validate.errors[0].message == 'Failed "type" criteria: expecting number or string, found null'
        throw new Error "'#{validate.errors[0].context.substr(2)}' must be of type (number or string)."
      else if validate.errors[0].message == 'Failed "type" criteria: expecting number or string, found object'
        throw new Error "'#{validate.errors[0].context.substr(2)}' must be of type (number or string)."
      else if validate.errors[0].message == 'Failed "type" criteria: expecting number or string, found boolean'
        throw new Error "'#{validate.errors[0].context.substr(2)}' must be of type (number or string)."
      else
        throw new Error "Config is invalid."
    this.config = config
    this.path = if this.config.path then this.config.path else process.cwd()
  else if typeof(config) == 'string'
    this.config = this.load config
    this.path = if this.config.path then this.config.path else config
  else
    this.config = {}
    this.path = process.cwd()
  
  if !this.path.match /^\//
    this.path = path.normalize "#{process.cwd()}/#{this.path}"
  
  # invalid config
  if this.config == false
    throw new Error "Unable to load config for (#{path})."
  
  if !this.config.host
    this.config.host = 'github.com'
    
  this

module.exports = crystal
