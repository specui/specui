# load dependencies
changecase = require 'change-case'
colors     = require 'colors'
cson       = require 'season'
fs         = require 'fs'
mkdirp     = require 'mkdirp'
mustache   = require 'mustache'
path       = require 'path'
pluralize  = require 'pluralize'
spawn      = require 'cross-spawn'

exports.generate = require './generate'

module.exports = (opts) ->
	
	opts = opts || {}
	
	# store path
	this.path = switch true
		when opts._ && opts._[1] then opts._[1]
		when typeof opts.path == 'string' then opts.path
		when this.path != undefined then this.path
		else process.cwd()
	
	if !fs.existsSync this.path
		mkdirp.sync this.path
	
	cwd = this.path
	
	# clean project
	#this.clean()
	
	# get config
	if !this.config and (this.config = this.load()) == false
		throw new Error 'Unable to load configuration.'
	
	if this.config.name
		console.log "\n#{this.config.name}".bold
	if this.config.description
		console.log "#{this.config.description}"
	if this.config.author
		console.log "by #{this.config.author.name} <#{this.config.author.email}> (#{this.config.author.url})"
	console.log "at #{this.path}\n"
	
	# generate code
	if opts.skipGeneration != true
		code = this.generate opts
		if opts == false
			throw new Error 'Unable to generate code.'
	
	if (opts._ and (opts._[0] == 'publish' or opts._[0] == 'run')) or !this.config.scripts or !this.config.scripts.build or opts.skipScripts
		console.log "\n" + ' DONE! '.bgGreen.white
		if opts and opts.complete
			opts.complete()
		return
	
	console.log "\nBUILD:".bold
	
	scripts = this.config.scripts
	
	i = 0
	buildCmd = () ->
		if !scripts.build[i]
			console.log "\n" + ' DONE! '.bgGreen.white
			if opts and opts.complete
				opts.complete()
			return
		
		if scripts.build[i].title and !scripts.build[i].command
			console.log ' BUILD TITLE '.bgGreen.white + (' ' + scripts.build[i].title + ' ').bgWhite + " \n"
			i++
			buildCmd()
			return
		
		description = scripts.build[i].description or scripts.build[i]
		command = scripts.build[i].command or scripts.build[i]
		if scripts.build[i].path
			if scripts.build[i].path.match /^\//
				dir = scripts.build[i].path
			else
				dir = "#{cwd}/#{scripts.build[i].path}"
			dir = path.normalize dir
		else
			dir = cwd
		
		console.log ' BUILD SCRIPT '.bgGreen.white + (' ' + description + ' ').bgWhite + " \n" + command.gray
		
		# spawn process
		proc = spawn 'bash', ['-c', command], { cwd: dir }
		
		# handle process events
		proc.stdout.on 'data', (data) ->
			console.log data.toString()
				
		proc.on 'exit', (err) ->
			buildCmd()
			
		proc.on 'error', (err) ->
			console.log "\n" + ' ERROR '.bgRed.white + (' ' + err.message + ' ').bgWhite
			console.log JSON.stringify(err, null, '  ').red
		
		i++
	
	if opts and opts.skipScripts == true
		return
		
	buildCmd()