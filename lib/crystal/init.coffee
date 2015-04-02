# load deps
assert = require 'assert'
crystal = {
	config: require './config'
	generate: require './generate'
}
fs = require 'fs'
yaml = require 'js-yaml'

init = (opts) ->
	
	# check if crystal config exists
	config = crystal.config '.'
	if config != false
		throw new Error 'this project has already been initialized'
	
	# get name/version
	opts.name = opts.name || opts._[1]
	opts.version = opts.version || opts._[2]
	
	# validate name/version
	assert opts.name, 'name is required'
	assert opts.version, 'version is required'
	
	# create config
	config = {
		name: opts.name
		version: opts.version
	}
	
	# add description to config
	if opts.description
		config.description = opts.description
	
	# add generators to config
	default_generators = this.default { _: ['default','generators'] }
	if default_generators
		config.generators = default_generators
	
	# convert config obj to yaml doc
	config = yaml.safeDump config
	
	# create src dir
	fs.mkdirSync 'src'
	
	# create gitignore/crystal config files
	fs.writeFileSync '.gitignore', 'lib/'
	fs.writeFileSync 'crystal.yml', config
	
	# build project
	crystal.generate { _: ['build','.'] }

module.exports = init