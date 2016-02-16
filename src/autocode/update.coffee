# load packages
autocode  = require '../autocode'
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

update = () ->
	# get module path
	path = "#{userHome}/.autocode/module/"
	if !fs.existsSync path
		mkdirp.sync path
	
	# load config
	if this.config
		config = this.config
	else
		config = this.load()
	
	# get modules from config
	if config.modules or config.imports
		modules = if config.modules then config.modules else config.imports
		
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
			
			# load submodules if module is local path
			if module_version_query.match /^(\.|\/)/
				module_path = module_version_query
				module_config = new autocode(module_path).config
				if module_config.imports
					loadModules module_config.imports
				else
					loadModules module_config.modules
				continue
			
			console.log "\n" + ' UPDATE '.bgBlue.white + " #{module_name} #{module_version_query} ".bgWhite.black
			
			# set headers for github
			headers = {
				'User-Agent': 'Crystal Autocode <support@autocode.run> (https://autocode.run/autocode)'
			}
			
			# get access token url
			access_token_url = ''
			if process.env.GITHUB_ACCESS_TOKEN
		    access_token_url += "?access_token=#{process.env.GITHUB_ACCESS_TOKEN}"
			
			# get latest release
			if module_version_query == 'latest'
				url = "https://api.github.com/repos/#{module_name}/releases/latest#{access_token_url}"
			# get all releases
			else
				url = "https://api.github.com/repos/#{module_name}/releases#{access_token_url}"
			resp = request 'get', url, { headers: headers, allowRedirectHeaders: ['User-Agent'] }
			if resp.statusCode != 200
				throw new Error "Module (#{module_name}) does not exist in the Crystal Hub."
			# parse latest release
			if module_version_query == 'latest'
				release = JSON.parse resp.body.toString()
				module_version = semver.clean release.tag_name
				tarball_url = release.tarball_url
			# find/parse release matching semver range
			else
				releases = JSON.parse resp.body.toString()
				if !releases[0]
					throw new Error "Repository not found for module: #{module_name}"
				for release in releases
					if semver.satisfies release.tag_name, module_version_query
						module_version = semver.clean release.tag_name
						tarball_url = release.tarball_url
						break
				if !module_version
					throw new Error "No matches for Module (#{module_name}) with version (#{module_version_query})"
			
			console.log ' DOWNLOAD '.bgGreen.white + " #{module_version} ".bgWhite.black
			
			module_path = "#{path}#{config.host}/#{module_path_name}/#{module_version}"
			#if fs.existsSync module_path
			#	continue
			
			# get module source url
			url = "#{tarball_url}#{access_token_url}"
			
			# download module
			response = request 'get', url, { headers: headers, allowRedirectHeaders: ['User-Agent'] }
			
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
				
				if module_version_query == 'latest'
					link_path = "#{path}#{config.host}/#{module_path_name}/latest"
					if fs.existsSync link_path
						fs.unlinkSync link_path
					fs.symlinkSync module_path, link_path
			
			# get module config and load sub modules
			submodules.push module_path
			module_config = new autocode(module_path).config
			if module_config.imports
				loadModules module_config.imports
			else
				loadModules module_config.modules
			
	loadModules modules
	
	for submodule in submodules
		project = new autocode submodule
		project.build {
			skipGeneration: true
		}
	
	console.log "\n" + ' DONE! '.bgGreen.white

module.exports = update
