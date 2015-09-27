module.exports = (opts) ->
	
	console.log 'Versioning project...'
	
	# load packages
	cson = require 'season'
	fs = require 'fs'
	semver = require 'semver'
	yaml = require 'js-yaml'
	
	# get config
	config = this.config('.')
	
	current_version = config.version
	
	# validate version
	version = opts._[1]
	config.version = semver.valid version
	
	if !config.version
		if ['major','minor','patch'].indexOf(version) == -1
			throw new Error "Invalid version: #{version}"
		
		# increment version
		config.version = semver.inc current_version, version
	
	ext = config.ext
	file = config.file
	delete config.ext
	delete config.file
	
	switch ext
		when 'yml','yaml' then fs.writeFileSync file, yaml.safeDump(config)
		when 'cson' then cson.writeFileSync file, config
		when 'json' then fs.writeFileSync file, JSON.stringify(config)
		when 'xml' then fs.writeFileSync file, xml.stringify(config)
	
	console.log "#{config.name} now at version #{config.version}."