# load packages
fs = require 'fs'
fstream = require './publish/fstream'
load = require './load'
mkdirp = require 'mkdirp'
prompt = require 'prompt'
request = require 'request'
tar = require 'tar-fs'
userHome = require 'user-home'
zlib = require 'zlib'

publish = (opts) ->
	
	crystal = this
	
	# build project
	#this.build(opts)
	
	console.log 'Publishing...'
	
	# get path
	this.path = if opts._ && opts._[1] then opts._[1] else '.'
	
	dest_dir = "#{userHome}/.autocode/tmp"
	mkdirp.sync dest_dir
	
	config = load this.path
	
	dest_file = "#{dest_dir}/#{config.name}-#{config.version}"
	dest = fs.createWriteStream "#{dest_file}.tar"
	
	packer = tar.Pack()
		.on 'error', (err) ->
			console.error "An error occurred: #{err}"
			
		.on 'end', () ->
			fs.createReadStream "#{dest_file}.tar"
				.pipe zlib.createGzip()
				.pipe fs.createWriteStream("#{dest_file}.tgz")
			fs.unlinkSync "#{dest_file}.tar"

			prompt.message = ''
			prompt.delimiter = ''
			prompt.start()
			
			prompt.get {
				properties: {
					username: {
						default: crystal.cache 'username'
						description: 'Enter your username'
						required: true
						type: 'string'
					},
					password: {
						description: 'Enter your password'
						hidden: true
						required: true
						type: 'string'
					}
				}
			}, publish
	
	publish = (err, result) ->
		# validate result
		if !result
			throw new Error 'Username/Password is required.'
		
		# validate username
		if !result.username
			throw new Error 'Username is required.'
		
		# validate password
		if !result.password
			throw new Error 'Password is required.'

		# cache username
		if !crystal.cache 'username'
			crystal.cache 'username', result.username
		
		formData = {
			file: fs.createReadStream "#{dest_file}.tgz"
			name: config.name
			version: config.version.split '.'
		}
		
		request.post {
			auth: {
				username: result.username,
				password: result.password
			},
			formData: formData,
			url: crystal.url 'api', 'publish'
		}, (err, resp, body) ->
			fs.unlinkSync "#{dest_file}.tgz"
			
			if err || resp.statusCode != 200
				if body == 'Version already exists.'
					name = formData.name
					version = formData.version.join '.'
					throw new Error "Version already exists (#{version}) for generator (#{name})."
				throw new Error 'Unable to publish project.'
			
			# cache username
			crystal.cache 'username', result.username
			
			console.log 'Done.'
	
	fstream { folder: config.version, path: this.path, type: 'Directory' }
		.on 'error', (err) ->
			console.error "An error occurred: #{err}"
		.pipe packer
		.pipe dest

module.exports = publish