# load packages
error    = require '../error'
fs       = require 'fs'
gunzip   = require 'gunzip-maybe'
mkdirp   = require 'mkdirp'
request  = require 'sync-request'
semver   = require 'semver'
tarfs    = require 'tar-fs'
untar    = require 'untar.js'
userHome = require 'user-home'
version  = require '../version'
zlib     = require 'zlib'

update = (opts) ->
	crystal = this
	
	# get path
	path = "#{userHome}/.crystal/module/"
	if !fs.existsSync path
		mkdirp.sync path
	
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
	
	submodules = []
	
	loadModules = (modules) ->
		for module_name of modules
			module_version = modules[module_name]
			module_path_name = module_name.replace /\./, '/'
			module_path = "#{path}#{module_path_name}/#{module_version}"
			if fs.existsSync module_path
				continue
			
			console.log "Loading module: #{module_name}@#{module_version}".blue
			
			mkdirp.sync module_path
			url = crystal.url 'api', "modules/#{module_name}"
			resp = request 'get', url
			if resp.statusCode != 200
				throw new Error "Module (#{module_name}) does not exist in the Crystal Hub."
			mod = JSON.parse resp.body.toString()
			if !mod.source
				throw new Error "Repository not found for module: #{module_name}"
			
			# get module source url
			url = mod.source
			if process.env.GITHUB_ACCESS_TOKEN
				url += "?access_token=#{process.env.GITHUB_ACCESS_TOKEN}"
			
			# download module
			response = request 'get', url, {
				headers:
					'User-Agent': 'Crystal <support@crystal.sh> (https://crystal.sh)'
			}
			
			# gunzip module
			data = zlib.gunzipSync response.body
			
			# untar module
			untar.untar(data).forEach (file) ->
				filename = file.filename.split('/').slice(1).join('/')
				file_path = require('path').dirname(filename)
				mkdirp.sync "#{module_path}/#{file_path}"
				buffer = new Buffer(file.fileData.length)
				i = 0
				while i < file.fileData.length
				  buffer.writeUInt8 file.fileData[i], i
				  i++
				fs.writeFileSync "#{module_path}/#{filename}", buffer
			
			# get module config and load sub modules
			submodules.push module_path
			module_config = crystal.config module_path
			loadModules module_config.modules
			
	loadModules modules
	
	for submodule in submodules
		crystal.build {
			path: submodule
			skipGeneration: true
		}
	
	console.log 'Done'

module.exports = update