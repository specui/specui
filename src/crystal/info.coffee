# load deps
bluebird = require 'bluebird'
request  = require 'sync-request'

request = bluebird.promisifyAll request

info = (opts) ->
  crystal = this
  
  if typeof opts == 'object'
    if opts._ && opts._[1]
      name = opts._[1]
    else if opts.name
      name = opts.name
  else if typeof name == 'string'
    name = opts
  
  if !name
    throw new Error "'name' is required for crystal search"
  
  type = if name.match(/\./) then 'module' else 'collection'
  
  console.log "Getting info for #{type} (#{name})...".blue
  
  resp = request 'get', crystal.url 'api', "modules/#{name}"
  
  if resp.statusCode != 200
    if resp.statusCode == 404
      throw new Error "Module does not exist: #{name}"
    else
      throw new Error 'Unable to get info.'
  
  # get module
  module = JSON.parse resp.body
  
  console.log "\n#{module.name} v#{module.version}".bold
  console.log "#{module.description}"
  
  console.log "\nModules:".bold
  for mod_name of module.modules
    mod_version = module.modules[mod_name]
    console.log "- #{mod_name}@#{mod_version}"
  
  console.log "\nImports:".bold
  for import_name of module.imports
    module_import = module.imports[import_name]
    console.log "- #{import_name}"
  
  console.log "\nExports:".bold
  for export_name of module.exports
    module_export = module.exports[export_name]
    console.log "- #{export_name} (#{module_export.type})"
  console.log ""
  
module.exports = info