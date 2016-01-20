# load deps
assert   = require 'assert'
colors   = require 'colors'
fs       = require 'fs'
path     = require 'path'
userHome = require 'user-home'
yaml     = require 'js-yaml'

popular_modules = []

init = (opts) ->
	
	# get path
	if opts._ and opts._[1]
		opts.path = opts._[1]
	else
		opts.path = opts.path || this.path || process.cwd()
	
	# validate path
	if !opts.path
		throw new Error 'Path is required.'
	else if !fs.existsSync opts.path
		throw new Error "Path does not exist: #{opts.path}"
	
	# check if autocode config exists
	config = this.load opts.path
	if config != false
		throw new Error "Autocode has already been initialized in: #{opts.path}"
	
	console.log "Initializing Autocode in: #{opts.path}".green.bold
	
	config = {}
	
	# create config
	if opts.name
		config.name = opts.name
	else
		config.name = path.basename opts.path
	
	# add description to config
	if opts.description
		config.description = opts.description
	
	if opts.author
		config.author = {
			name: opts.author_name
			email: opts.author_email
			url: opts.author_url
		}
	
	if opts.copyright
		config.copyright = opts.copyright
	
	if opts.modules
		config.modules = {}
		for module_name of opts.modules
			exports = opts.modules[module_name]
			config.modules[module_name] = 'latest'
			if exports.length
				config.imports = {}
				for exp in exports
					config.imports["#{exp}"] = "#{module_name}.#{exp}"
	
	# convert config obj to yaml doc
	config = yaml.safeDump config
	
	# create src dir
	if !fs.existsSync "#{opts.path}/.autocode"
		fs.mkdirSync "#{opts.path}/.autocode"
	
	# create autocode config
	fs.writeFileSync "#{opts.path}/.autocode/config.yml", config
	
	console.log 'Autocode initialization is complete.'.green
	
	this.build opts.path

module.exports = init