# load deps
crystal = {
	config: require './config'
	generate: require './generate'
}
assert = require 'assert'
colors = require 'colors'
fs     = require 'fs'
prompt = require 'prompt'
yaml   = require 'js-yaml'

initProject = (opts, path) ->
	# validate name
	if !opts.name
		throw new Error 'Name is required.'
	
	# validate version
	if !opts.version
		throw new Error 'Version is required.'
	
	# create config
	config = {
		id: opts.id
		name: opts.name
		version: opts.version
	}
	
	# add description to config
	if opts.description
		config.description = opts.description
	
	# add generators to config
	#default_generators = this.default { _: ['default','generators'] }
	#if default_generators
	#	config.generators = default_generators
	
	# convert config obj to yaml doc
	config = yaml.safeDump config
	
	# create src dir
	if !fs.existsSync "#{path}/.crystal"
		fs.mkdirSync "#{path}/.crystal"
	
	# create crystal config
	fs.writeFileSync "#{path}/.crystal/config.yml", config
	
	console.log 'Crystal initialization is complete.'
	
init = (opts) ->
	
	# get path
	opts.path = opts._[1] || opts.path || this.path || process.cwd()
	
	# validate path
	if !opts.path
		throw new Error 'Path is required.'
	else if !fs.existsSync opts.path
		throw new Error "Path does not exist: #{opts.path}"
	
	# check if crystal config exists
	config = crystal.config opts.path
	if config != false
		throw new Error "Crystal has already been initialized in: #{opts.path}"
	
	console.log "Initializing Crystal in: #{opts.path}".green.bold
	
	# setup prompt
	prompt.message = ''
	prompt.delimiter = ''
	prompt.start()
	
	if opts.name and opts.name.length and opts.version and opts.version.length
		initProject opts, opts.path
	else
		properties = {}
		
		if !opts.id
			properties.id = {
				description: "ID (ex: acme.website)"
				required: true
				type: 'string'
			}
		if !opts.name
			properties.name = {
				description: "Name (ex: Acme Website)"
				required: true
				type: 'string'
			}
		if !opts.version
			properties.version = {
				default: '0.1.0'
				description: "Version"
				required: true
				type: 'string'
			}
		if !opts.description
			properties.description = {
				description: "Description (ex: website for Acme, Inc.)"
				type: 'string'
			}
			
		prompt.get { properties: properties }, (err, result) ->
			if err
				console.log "\nMaybe next time."
			else
				result.name = opts.name || result.name
				result.version = opts.version || result.version
				result.description = opts.description || result.description
				
				initProject result, opts.path

module.exports = init