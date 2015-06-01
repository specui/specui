# load packages
async    = require 'async'
error    = require '../error'
fs       = require 'fs'
git      = require 'gift'
mkdirp   = require 'mkdirp'
request  = require 'request'
semver   = require 'semver'
tar      = require 'tar'
userHome = require 'user-home'
version  = require '../version'
zlib     = require 'zlib'

update = (opts) ->
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
		
	crystal = this
	load_modules = {}
	repos = {}
	resp = (err, data) ->
		for item in data.Items
			#if !modules or !modules[item.id.S]
				#continue
			repos[item.id.S] = item.repository.S
			tag = modules[item.id.S] or 'master'
			repo_path = "#{path}#{item.id.S.replace(/\./g,'/')}/#{tag}"
			if !fs.existsSync repo_path
				mkdirp repo_path
				repo = git.clone item.repository.S, repo_path, (err, _repo) ->
					if err
						console.log err
						return
					crystal.update {path: _repo.path}
					console.log "Repo created: #{_repo.path}"
		
module.exports = update