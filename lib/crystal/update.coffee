# load packages
async = require 'async'
error = require '../error'
fs = require 'fs'
mkdirp = require 'mkdirp'
request = require 'request'
semver = require 'semver'
tar = require 'tar'
userHome = require 'user-home'
version = require '../version'
zlib = require 'zlib'

update = (opts) ->
	
	crystal = this
	
	# get generators from opts
	if opts.generators
		generators = opts.generators
		
	# get generators from config
	else
		# store path
		if opts._ && opts._[1]
			this.path = opts._[1]
		else if opts.path
			this.path = opts.path
		else
			this.path = '.'
		
		# get config
		config = crystal.config()
		
		# get generators
		generators = config.generators
	
	# get path
	path = "#{userHome}/.crystal/gen/"
	if !fs.existsSync path
		mkdirp path
	
	generator_files = []
	generator_versions = {}
	for generator_name of generators
		generator = generators[generator_name]
		
		generator_path = path + generator_name + '/' + version(generator.version)
		
		if !fs.existsSync generator_path
			if !fs.existsSync "#{path}#{generator_name}"
				fs.mkdirSync "#{path}#{generator_name}"
			generator_versions[generator_name] = generator.version
	
	request.get crystal.url('api', 'update'), {
		json: true,
		qs: {
			generators: generator_versions
		}
	}, (err, resp, body) ->
		if err || resp.statusCode != 200
			error 'Unable to load generators.'
		
		for generator in body
			currentVersion = generator.versions[0].name
			for version in generator.versions
				if semver.gt version.name, currentVersion
					currentVersion = version.name
			generator_files.push [ generator.name, currentVersion ]
		
		async.map generator_files, fetch, complete
	
	complete = (err, results) ->
		console.log 'Done.'
	
	deflate = (gen, cb) ->
		deflate_path = "#{path}#{gen[0]}/#{gen[1]}"
		deflate_contents = fs.readFileSync("#{deflate_path}.tgz")
		deflator = zlib.gunzip deflate_contents, (err, buff) ->
			
			if err
				error 'Unable to extract generator: %s', "#{gen[0]}@#{gen[1]}"
			
			fs.writeFileSync "#{deflate_path}.tar", buff
			
			extractor = tar.Extract { path: "#{path}#{gen[0]}" }
				.on 'error', (err) ->
					error 'Unable to extract generator: %s', "#{gen[0]}@#{gen[1]}"
				.on 'end', () ->
					if fs.existsSync "#{path}#{gen[0]}/latest"
						fs.unlinkSync "#{path}#{gen[0]}/latest"
					fs.symlinkSync "#{path}#{gen[0]}/#{gen[1]}", "#{path}#{gen[0]}/latest"
					fs.unlinkSync "#{deflate_path}.tar"
					fs.unlinkSync "#{deflate_path}.tgz"
					cb()
			
			fs.createReadStream "#{deflate_path}.tar"
				.on 'error', (err) ->
					error 'Unable to extract generator: %s', "#{gen[0]}@#{gen[1]}"
				.pipe extractor
	
	fetch = (gen, cb) ->
		console.log "Fetching Version (#{gen[1]}) for Generator (#{gen[0]})..."
		
		fetch_file = "https://s3.amazonaws.com/crystal-gen/#{gen[0]}/#{gen[0]}-#{gen[1]}.tgz"
		fetch_path = "#{path}#{gen[0]}/#{gen[1]}"
		
		file = fs.createWriteStream "#{fetch_path}.tgz"
		request.get fetch_file
			.pipe file
		file.on 'finish', () ->
			deflate gen, cb

module.exports = update