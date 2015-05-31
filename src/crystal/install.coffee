# load deps
request = require 'request'

install = (opts) ->
  crystal = this
  
  if typeof opts == 'object'
    if opts._ && opts._[1]
      name = opts._[1]
    else if opts.keyword
      name = opts.name
  else if typeof keyword == 'string'
    name = opts
  
  if !name
    throw new Error "'name' is required for crystal install"
  
  console.log "Finding generator (#{name})..."
  
  request.get {
    qs: {
      name: name
    }
    url: crystal.url 'api', 'generators'
  }, (err, resp, body) ->
    if err || resp.statusCode != 200
      throw new Error 'Search failed.'
    
    # get generator
    generator = JSON.parse body
    
    if !generator
      throw new Error "Unable to locate generator (#{name})."
    
    generators = {}
    generators[name] = {
      version: 'latest'
    }
    
    crystal.update {
      generators: generators
    }
    
    console.log "Found generator (#{generator.name})."
    console.log "Successfully installed #{name}@latest generator!"
    console.log "Now you can add it to your project's crystal config file like so:"
    console.log ""
    console.log "generators:"
    console.log "  #{name}:"
    console.log "    version: latest"
  
module.exports = install