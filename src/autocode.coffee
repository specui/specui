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

autocode = (config) ->
  
  # define methods
  methods = [
    'build'
    'cache'
    #'clean'
    #'data'
    #'default'
    #'format'
    'generate'
    'hi'
    'info'
    'import'
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
    this[method] = require "./autocode/#{method}"
  
  if typeof(config) == 'object'
    validate = this.validate config
    if !validate.valid
      match = 'Failed "type" criteria:'
      if validate.errors[0].message.match match
        message = validate.errors[0].message.replace /Failed "type" criteria: expecting (.*?), found (.*?)$/, "`#{validate.errors[0].context.substr(2)}` must be a `$1`, not a `$2`."
        message = message.replace /\ or\ /, '` or `'
        throw new Error message
      
      match = 'Failed "required" criteria:'
      if validate.errors[0].message.match match
        message = validate.errors[0].message.replace /Failed "required" criteria: missing property \((.*?)\)$/, "`#{validate.errors[0].context.substr(2).replace(/\//, '.')}.$1` is required."
        message = message.replace /\ or\ /, '` or `'
        throw new Error message
      
      console.log validate
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
    throw new Error "Unable to load config for (#{this.path})."
  
  if !this.config.host
    this.config.host = 'github.com'
    
  this

module.exports = autocode
