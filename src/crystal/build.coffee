# load dependencies
changecase = require 'change-case'
colors     = require 'colors'
cson       = require 'season'
fs         = require 'fs'
mkdirp     = require 'mkdirp'
mustache   = require 'mustache'
pluralize  = require 'pluralize'
spawn      = require 'cross-spawn'

exports.generate = require './generate'

module.exports = (opts, callback) ->
	
	opts = opts || {}
	
	# store path
	this.path = switch true
		when opts._ && opts._[1] then opts._[1]
		when typeof opts.path == 'string' then opts.path
		when this.path != undefined then this.path
		else process.cwd()
	
	process.chdir this.path
	
	# clean project
	#this.clean()
	
	# get config
	if (this.project = this.config()) == false
		throw new Error 'Unable to load configuration.'
	
	if this.project.name
		console.log "\n#{this.project.name} (#{this.project.id}@#{this.project.version})".bold
	if this.project.author
		console.log "by #{this.project.author.name} <#{this.project.author.email}> (#{this.project.author.url})"
	console.log "at #{this.path}\n"
	
	# generate code
	if opts.skipGeneration != true
		if this.generate() == false
			throw new Error 'Unable to generate code.'
	
	if (opts._ and (opts._[0] == 'publish' or opts._[0] == 'run')) or !this.project.scripts or !this.project.scripts.build
		console.log 'Done.'
		return
	
	console.log "\nRunning build scripts...".bold
	
	opts = this.opts
	scripts = this.project.scripts
	
	i = 0
	buildCmd = () ->
		if !scripts.build[i]
			console.log "Done!\n".bold
			if callback
				callback()
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
	
	if opts.skipScripts != true
		buildCmd()