# load packages
async    = require 'async'
error    = require '../error'
fs       = require 'fs'
git      = require 'gift'
mkdirp   = require 'mkdirp'
request  = require 'sync-request'
semver   = require 'semver'
tar      = require 'tar'
userHome = require 'user-home'
version  = require '../version'
zlib     = require 'zlib'

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
	
	for module_name of modules
		url = crystal.url 'api', "modules/#{module_name}"
		resp = request 'get', url
		if resp.statusCode != 200
			throw new Error "Module (#{module_name}) does not exist in the Crystal Hub."
		mod = JSON.parse resp.body.toString()
		
		module_version = modules[module_name]
		module_path_name = module_name.replace /\./, '/'
		module_path = "#{path}#{module_path_name}/#{module_version}"
		if fs.existsSync module_path
			continue
		mkdirp module_path
		
		repo = git.clone mod.repository, module_path, (err) ->
			console.log err

module.exports = update