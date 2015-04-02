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

crystal = (path) ->
  
  # define methods
  methods = [
    'build'
    'cache'
    'clean'
    'config'
    'data'
    'default'
    'format'
    'generate'
    'init'
    'install'
    'publish'
    'process'
    'run'
    'search'
    'signup'
    'spec'
    'test'
    'update'
    'url'
    'validate'
    'version'
  ]
  
  # load methods
  for method in methods
    this[method] = require "./crystal/#{method}"
  
  # load or validate config
  if typeof path == 'string'
    this.path = path
    config = this.config path
  else if typeof path == 'object'
    config = this.validate path
  
  # invalid config
  if config == false
    throw new Error "Unable to load config for (#{path})."
    
  # define config
  if config != undefined
    this.config = config
  
  # define opts
  this.opts = {}
  
  this

module.exports = crystal