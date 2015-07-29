# load packages
error    = require '../error'
fs       = require 'fs'
gunzip   = require 'gunzip-maybe'
mkdirp   = require 'mkdirp'
request  = require 'sync-request'
requestA = require 'request'
semver   = require 'semver'
tarfs    = require 'tar-fs'
userHome = require 'user-home'
version  = require '../version'

update = (opts) ->
	crystal = this
	
	# get path
	path = "#{userHome}/.crystal/module/"
	if !fs.existsSync path
		mkdirp path
	
	# get modules from opts
	if opts.modules
		modules = opts.modules
		
	# get modules from config
	else
		# store path
		if opts._ && opts._[1]
			this.path = opts._[1]
		else if opts.path
			this.path = opts.path
		else
			this.path = '.'
		
		# get config
		config = this.config()
		
		# get modules
		modules = config.modules
	
	if !modules
		return
	
	loadModules = (modules) ->
		for module_name of modules
			module_version = modules[module_name]
			module_path_name = module_name.replace /\./, '/'
			module_path = "#{path}#{module_path_name}/#{module_version}"
			if fs.existsSync module_path
				continue
			
			console.log "Loading module: #{module_name}@#{module_version}".blue
			
			mkdirp module_path
			url = crystal.url 'api', "modules/#{module_name}"
			resp = request 'get', url
			if resp.statusCode != 200
				throw new Error "Module (#{module_name}) does not exist in the Crystal Hub."
			mod = JSON.parse resp.body.toString()
			if !mod.source
				throw new Error "Repository not found for module: #{module_name}"
			
			url = mod.source
			if process.env.GITHUB_ACCESS_TOKEN
				url += "?access_token=#{process.env.GITHUB_ACCESS_TOKEN}"
			r = requestA.get {
				headers:
					'User-Agent': 'Crystal <support@crystal.sh> (https://crystal.sh)'
				url: url
			}
			.pipe(gunzip()).pipe(tarfs.extract(module_path, {
			  map: (header) ->
			    header.name = header.name.split('/').slice(1).join('/')
			    header
			}))
			r.on 'finish', () ->
				module_config = crystal.config module_path
				loadModules module_config.modules
	
	loadModules modules

module.exports = update