# load deps
request = require 'sync-request'

install = (opts) ->
  crystal = this
  
  if typeof opts == 'object' && opts.name
    name = opts.name
  else if typeof keyword == 'string'
    name = opts
  
  if !name
    throw new Error "'name' is required for crystal install"
  
  console.log "Loading module (#{name})...".blue
  
  url = crystal.url 'api', "modules/#{name}"
  resp = request 'get', url, {
    qs:
      name: name
  }
  
  if resp.statusCode != 200
    throw new Error 'Search failed.'
  
  # get generator
  generator = JSON.parse resp.body
  
  if !generator
    throw new Error "Unable to locate generator (#{name})."
  
  modules = {}
  modules[name] = 'latest'
  
  crystal.update {
    modules: modules
  }
  
  console.log "Found generator (#{generator.name}).".green
  console.log "Successfully installed #{name}@latest generator!"
  console.log "Now you can add it to your project's crystal config file like so:"
  console.log ""
  console.log "modules:"
  console.log "  #{name}: latest"
  console.log ""

module.exports = install
