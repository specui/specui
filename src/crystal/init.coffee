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

popular_modules = [
	'official.readme'
	'official.license'
	'official.authors'
	'official.express'
	'official.laravel'
	'official.rails'
	'official.gorm'
]

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
	
	# add modules to config
	if opts.modules
		config.modules = {}
		for i in opts.modules
			module = popular_modules[parseInt(i)-1]
			config.modules[module] = 'latest'
	
	# convert config obj to yaml doc
	config = yaml.safeDump config
	
	# create src dir
	if !fs.existsSync "#{path}/.crystal"
		fs.mkdirSync "#{path}/.crystal"
	
	# create crystal config
	fs.writeFileSync "#{path}/.crystal/config.yml", config
	
	console.log 'Crystal initialization is complete.'.green
	
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
				result.id = opts.id || result.id
				result.name = opts.name || result.name
				result.version = opts.version || result.version
				result.description = opts.description || result.description
				
				console.log "Choose from popular modules to get you started:".bold
				for i of popular_modules
					popular_module = popular_modules[i]
					module_i = parseInt(i)+1
					console.log "#{module_i}) #{popular_module}"
				
				addModule = () ->
					prompt.get {
						properties:
							module:
								description: 'Module (ex: 1, 2, official.readme)'
					}, (err, module_result) ->
						if err
							console.log "\nMaybe next time."
						else
							if module_result.module.length
								if !result.modules
									result.modules = []
								result.modules.push(module_result.module)
								addModule()
							else
								initProject result, opts.path
				addModule()

module.exports = init