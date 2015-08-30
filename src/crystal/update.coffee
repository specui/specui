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
		if config.imports
			modules = config.imports
		else
			modules = config.modules
	
	if !modules
		return
	
	loaded_modules = {}
	submodules = []
	
	loadModules = (modules) ->
		for module_name of modules
			module_version = null
			module_version_query = modules[module_name]
			module_path_name = module_name.replace /\./, '/'
			
			if !loaded_modules[module_name]
				loaded_modules[module_name] = []
			if loaded_modules[module_name].indexOf(module_version_query) != -1
				continue
			else
				loaded_modules[module_name].push module_version_query
			
			console.log "Loading module (#{module_name}) with version (#{module_version_query})...".blue
			
			# set headers for github
			headers = {
				'User-Agent': 'Crystal <support@crystal.sh> (https://crystal.sh)'
			}
			
			# get access token url
			access_token_url = ''
			if process.env.GITHUB_ACCESS_TOKEN
		    access_token_url += "?access_token=#{process.env.GITHUB_ACCESS_TOKEN}"
			
			url = "https://api.github.com/repos/#{module_name}/releases#{access_token_url}"
			resp = request 'get', url, { headers: headers }
			if resp.statusCode != 200
				throw new Error "Module (#{module_name}) does not exist in the Crystal Hub."
			releases = JSON.parse resp.body.toString()
			if !releases[0]
				throw new Error "Repository not found for module: #{module_name}"
			for release in releases
				if semver.satisfies release.tag_name, module_version_query
					module_version = semver.clean release.tag_name
					tarball_url = release.tarball_url
					break
			if !module_version
				throw new Error "No matches for Module (#{module_name}) with version (#{module_version_query}). Try: crystal update"
			
			console.log "Found version (#{module_version}) for module (#{module_name}).".green
			
			module_path = "#{path}#{config.host}/#{module_path_name}/#{module_version}"
			#if fs.existsSync module_path
			#	continue
			
			# get module source url
			url = "#{tarball_url}#{access_token_url}"
			
			# download module
			response = request 'get', url, { headers: headers }
			
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