# load deps
request = require 'request'

search = (opts) ->
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
  
  console.log "Searching for generators matching name (#{name})..."
  
  request.get {
    qs: {
      name: "%#{name}%"
    }
    url: crystal.url 'api', 'modules'
  }, (err, resp, body) ->
    if err || resp.statusCode != 200
      throw new Error 'Search failed.'
    
    # get modules
    modules = JSON.parse body
    
    # print matches
    console.log "Found #{modules.length} generator(s)!"
    
    # print module names
    for mod in modules
      console.log "- #{mod.Collection.name}.#{mod.name}"

module.exports = search