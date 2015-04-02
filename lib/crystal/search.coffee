# load deps
request = require 'request'

search = (opts) ->
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
      name: name
    }
    url: crystal.url 'api', 'generators/search'
  }, (err, resp, body) ->
    if err || resp.statusCode != 200
      throw new Error 'Search failed.'
    
    # get generators
    generators = JSON.parse body
    
    # print matches
    console.log "Found #{generators.length} generator(s)!"
    
    # print generator names
    for generator in generators
      console.log "#{generator.name}"

module.exports = search