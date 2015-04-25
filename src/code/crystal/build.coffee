# load dependencies
changecase = require 'change-case'
cson = require 'season'
fs = require 'fs'
mkdirp = require 'mkdirp'
mustache = require 'mustache'
pluralize = require 'pluralize'
spawn = require('child_process').spawn

exports.generate = require './generate'

module.exports = (opts) ->
	
	opts = opts || {}
	
	# store path
	this.path = switch true
		when opts._ && opts._[1] then opts._[1]
		when typeof opts.path == 'string' then opts.path
		when this.path != undefined then this.path
		else process.cwd()
	
	console.log "Building from: #{this.path}"
	
	# clean project
	#this.clean()
	
	console.log 'Loading Configuration...'
	
	# get config
	if (this.project = this.config()) == false
		throw new Error 'Unable to load configuration.'
		
	# generate code
	if this.generate() == false
		throw new Error 'Unable to generate code.'
	
	if (opts._ and (opts._[0] == 'publish' or opts._[0] == 'run')) or !this.config.scripts or !this.config.scripts.build
		console.log 'Done.'
		return
	
	console.log 'Running build scripts...'
	
	opts = this.opts
	scripts = this.config.scripts
	
	i = 0
	buildCmd = () ->
		if !scripts.build[i]
			console.log 'Done.'
			return
		
		# get build cmd/arg
		build = scripts.build[i]
		build = [
			build.substr(0, build.indexOf(' ')),
			build.substr(build.indexOf(' ') + 1)
		]
		cmd = build[0]
		arg = build[1].split(' ')
		
		# spawn process
		proc = spawn cmd, arg
		
		# handle process events
		proc.stdout.on 'data', (data) ->
			console.log data.toString()
				
		proc.on 'exit', (err) ->
			buildCmd()
			
		proc.on 'error', (err) ->
			console.log 'build error', err
		
		i++
	
	buildCmd()