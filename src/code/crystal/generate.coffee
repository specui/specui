# load deps
crystal = {
	config: require './config'
}
cson         = require 'cson-parser'
extend       = require 'extend-combine'
findVersions = require 'find-versions'
fs           = require 'fs'
error        = require '../error'
handlebars   = require 'handlebars'
merge        = require 'merge'
mkdirp       = require 'mkdirp'
mustache     = require 'mustache'
readdir      = require 'fs-readdir-recursive'
season       = require 'season'
semver       = require 'semver'
skeemas      = require 'skeemas'
userHome     = require 'user-home'
yaml         = require 'js-yaml'

generate = (config, spec) ->
	console.log "Generating code from: #{this.path}"
	
	# get config
	config = config or this.config
	if !config then return false
	
	# get spec
	spec = spec or this.spec
	if !spec then return false
	
	# get code path
	code_path = "#{this.path}/src/code"
	if fs.existsSync code_path
		code_files = readdir code_path
		for code_file in code_files
			path = "#{this.path}/lib/#{code_file}"
			code_dir = path.substring 0, path.lastIndexOf('/')+1
			if !fs.existsSync code_dir
				mkdirp code_dir
			fs.writeFileSync "#{this.path}/lib/#{code_file}", fs.readFileSync "#{code_path}/#{code_file}"
	
	mapping = {}
	passable_generators = {}
	
	# get gen path
	gen_path = "#{userHome}/.crystal/gen/"
	
	if !config.generators
		console.log "You have not added any generators yet!"
	
	# loop thru project's generators
	for generator_name of config.generators
		# require generator's version
		if !config.generators[generator_name] || !config.generators[generator_name].version
			throw new Error "Version not specified for Generator (#{generator_name})."
		# validate "latest" version
		else if config.generators[generator_name].version == 'latest'
			generator_version = 'latest'
		# validate semver version
		else
			generator_version = findVersions(config.generators[generator_name].version, { loose: true })[0]
		
		# get local generator's path
		if generator_name.substr 0, 1 == '/'
			generator_path = generator_name
		# get public generator's path
		else
			generator_path = "#{gen_path}#{generator_name}/#{generator_version}"
		
		# version for public generator does not exist
		if !fs.existsSync generator_path
			throw new Error "Version (#{generator_version}) does not exist for Generator (#{generator_name}). Try: crystal update"
		
		console.log "Loading config for Generator (#{generator_name})..."
		
		# get generator config
		generator_config = this.loadConfig generator_path
		
		if generator_config.pass
			continue
		
		for passable_generator_name of generator_config.generators
			if generator_config.generators[passable_generator_name].pass
				if !passable_generators[passable_generator_name]
					passable_generators[passable_generator_name] = {}
				passable_generators[passable_generator_name] = extend(
					true,
					true,
					passable_generators[passable_generator_name],
					generator_config.generators[passable_generator_name]
				)
				delete passable_generators[passable_generator_name].pass
	
	for i of config.generators
		for n of passable_generators
			if config.generators[i].version == 'latest' or passable_generators[n].version == 'latest'
				config.generators[i].version = 'latest'
				passable_generators[n].version = 'latest'
				continue

			gen1_ver = findVersions(config.generators[i].version, { loose: true })[0]
			gen2_ver = findVersions(passable_generators[n].version, { loose: true })[0]
			
			if i == n
				if gen1_ver == gen2_ver
					config.generators[i].version = gen1_ver
					passable_generators[n].version = gen1_ver
					continue
				
				if semver.gt gen1_ver, gen2_ver
					if !semver.satisfies gen1_ver, passable_generators[n].version
						error(
							'Version %s does not work for %s',
							config.generators[i].version, passable_generators[n].version
						)
					config.generators[i].version = gen1_ver
					passable_generators[n].version = gen1_ver
				else
					if !semver.satisfies gen2_ver, config.generators[i].version
						error(
							'Version %s does not work for %s',
							passable_generators[n].version, config.generators[i].version
						)
					config.generators[i].version = gen2_ver
					passable_generators[n].version = gen2_ver
					
	generators = extend true, true, config.generators, passable_generators
	config_data = config
	config_data.generators = generators
	data = {
		data: config_data
	}
	
	for generator_name of generators
		if !generators[generator_name].version
			throw new Error "Version not specified for Generator (#{generator_name})."
		else if generators[generator_name].version == 'latest'
			generator_version = 'latest'
		else
			generator_version = findVersions(generators[generator_name].version, { loose: true })[0]
		if generator_name.substr 0, 1 == '/'
			generator_path = generator_name
		else
			generator_path = gen_path + generator_name + '/' + generator_version
		
		# get generator config
		generator_config = crystal.config generator_path
		
		if generator_config.pass
			continue
		
		if typeof this.config.generators[generator_name].spec == 'string'
			this.config.generators[generator_name].spec = season.readFileSync(
				this.config.generators[generator_name].spec
			)
		
		gen_spec = {}
		validate_spec = this.config.generators[generator_name].spec || {}
		if generator_config.gen
			if generator_config.schema or generator_config.gen.schema or fs.existsSync("#{generator_path}/src/schema.yml") or fs.existsSync("#{generator_path}/src/schema.yaml") or fs.existsSync("#{generator_path}/src/schema.cson") or fs.existsSync("#{generator_path}/src/schema.json")
				if generator_config.schema
					schema = generator_config.schema
				else if generator_config.gen.schema
					schema = generator_config.gen.schema
				else
					schema = switch true
						when fs.existsSync "#{generator_path}/src/schema.yml"
							yaml.safeLoad fs.readFileSync("#{generator_path}/src/schema.yml")
						when fs.existsSync "#{generator_path}/src/schema.yaml"
							yaml.safeLoad fs.readFileSync("#{generator_path}/src/schema.yaml")
						when fs.existsSync "#{generator_path}/src/schema.cson"
							cson.readFileSync "#{generator_path}/src/schema.cson"
						when fs.existsSync "#{generator_path}/src/schema.json"
							JSON.parse fs.readFileSync("#{generator_path}/src/schema.json")
						else
							throw new Error "Unknown file format for schema (#{schema_name})"
							
				if schema.type == 'object' and fs.existsSync "#{generator_path}/src/schema/properties"
					if !schema.properties
						schema.properties = {}
					schema_files = fs.readdirSync "#{generator_path}/src/schema/properties"
					for schema_file in schema_files
						schema_name = schema_file.replace(/\.(cson|json|yaml|yml)$/i, '')
						schema_file = "#{generator_path}/src/schema/properties/#{schema_file}"
						schema_data = switch true
							when schema_file.match(/\.yml$/i) != null, schema_file.match(/\.yaml$/i) != null
								yaml.safeLoad fs.readFileSync(schema_file)
							when schema_file.match(/\.cson$/i) != null
								cson.readFileSync schema_file
							when schema_file.match(/\.json$/i) != null
								JSON.parse fs.readFileSync(schema_file)
							else
								throw new Error "Unknown file format for schema (#{schema_name})"
						schema.properties[schema_name] = schema_data
				
				for property_name of schema.properties
					if validate_spec[property_name] == undefined && this.config[property_name]
						validate_spec[property_name] = this.config[property_name]
				
				validate = skeemas.validate validate_spec, schema
				if !validate.valid
					console.log("Spec failed validation:")
					console.log(validate.errors)
					throw new Error "Invalid spec for Generator (#{generator_name})."
				
				gen_spec = validate_spec
				
			else if generator_config.gen.spec
				for spec_name of generator_config.gen.spec
					if generator_config.gen.spec[spec_name].required and !this.config.generators[generator_name].spec[spec_name]
						error(
							'%s spec is required for %s generator',
							spec_name, generator_name
						)
					
					if !this.config.generators[generator_name].spec || !this.config.generators[generator_name].spec[spec_name]
						continue
					
					switch generator_config.gen.spec[spec_name].type
						when 'array'
							gen_spec[spec_name] = []
							for i of this.config.generators[generator_name].spec[spec_name]
								g = {}
								g[generator_config.gen.spec[spec_name].key] = this.config.generators[generator_name].spec[spec_name][i]
								gen_spec[spec_name].push g
							
						when 'number'
							gen_spec[spec_name] = this.config.generators[generator_name].spec[spec_name]
							
						when 'object'
							gen_spec[spec_name] = []
							for key of this.config.generators[generator_name].spec[spec_name]
								g = {}
								g[generator_config.gen.spec[spec_name].key] = key
								g[generator_config.gen.spec[spec_name].value] = this.config.generators[generator_name].spec[spec_name][key]
								gen_spec[spec_name].push g
							
						when 'string'
							gen_spec[spec_name] = this.config.generators[generator_name].spec[spec_name]
		
		generator_spec = merge spec, gen_spec
		
		if generator_config.mapping && generator_config.mapping.model && generator_config.mapping.details && generator_config.mapping.details.type
			mapping = {}
			for i of generator_config.mapping.details.type
				mapping[i] = generator_config.mapping.details.type[i]
		
		if generator_spec.models
			for generator_spec_model in generator_spec.models
				n = generator_spec_model.details.length
				while n--
					if mapping && mapping[generator_spec_model.details[n].type] != undefined
						if !mapping[generator_spec_model.details[n].type]
							generator_spec_model.details.splice(n, 1)
						else
							generator_spec_model.details[n].type = mapping[generator_spec_model.details[n].type]
		
		# get gens
		if generator_config.gen
			gens = generator_config.gen
			if generator_config.gen.file
				gens = generator_config.gen.file
			
			for gen_name of gens
				gen = gens[gen_name]
				
				if !fs.existsSync "#{generator_path}/src/gen/#{gen_name}.hbs"
					content = switch gen.encoder
						when 'cson' then season.stringify spec
						when 'json' then JSON.stringify spec, null, "\t"
						when 'yaml' then yaml.safeDump spec
						else throw new Error "Unsupported encoder (#{generator_config.gen.file[gen_file].decoder}) for generator (#{generator_name})."
					
					# get dest folder/file
					dest_folder = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib')
					dest_file = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib') + '/'
					if gen.dest
						dest_file += gen.dest
					else
						dest_file += gen_name
					
					# create dirs
					mkdirp.sync dest_folder
					
					# write to dest file
					fs.writeFileSync dest_file, content
		
		# get gen files
		if !fs.existsSync "#{generator_path}/src/gen"
			continue
		
		gen_files = fs.readdirSync "#{generator_path}/src/gen"
		
		# process each gen file
		for gen_file in gen_files
			gen_file_contents = fs.readFileSync "#{generator_path}/src/gen/#{gen_file}", { encoding: 'utf8' }
			gen_file_contents = gen_file_contents.replace /{{\*/g, '{{#'
			
			gen_file = gen_file.replace /\.hbs/, ''
			
			if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].mapping && generator_config.gen.file[gen_file].mapping.model && generator_config.gen.file[gen_file].mapping.model.details && generator_config.gen.file[gen_file].mapping.model.details.type
				mapping = {}
				for i of generator_config.gen.file[gen_file].mapping.model.details.type
					mapping[i] = generator_config.gen.file[gen_file].mapping.model.details.type[i]
			
			if generator_spec.models
				for generator_spec_model in generator_spec.models
					n = generator_spec_model.details.length
					while n--
						if mapping && mapping[generator_spec_model.details[n].type] != undefined
							if !mapping[generator_spec_model.details[n].type]
								generator_spec_model.details.splice(n, 1)
							else
								generator_spec_model.details[n].type = mapping[generator_spec_model.details[n].type]
			
			if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].spec == 'contributors'
				if generator_spec.project.contributors
					# render content via handlebars
					content = handlebars.compile(gen_file_contents) generator_spec.project, data
					
					# get dest folder/file
					dest_file = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib') + '/' + gen_file
					
					# write to dest file
					fs.writeFileSync dest_file, content
					
			else if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].spec == 'models'
				for i of spec.models
					# render content via handlebars
					dest = handlebars.compile(generator_config.gen.file[gen_file].dest) spec.models[i]
					content = handlebars.compile(gen_file_contents) merge(spec, spec.models[i]), data
					
					# get dest folder/file
					dest_folder = dest.split '/'
					delete dest_folder[dest_folder.length-1]
					dest_folder = dest_folder.join '/'
					dest_folder = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib') + '/' + dest_folder
					dest_file = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib') + '/' + dest
					
					# create dirs
					mkdirp.sync dest_folder
					
					# write to dest file
					fs.writeFileSync dest_file, content
					
			else
				# render content via handlebars
				content = handlebars.compile(gen_file_contents) spec, data
				
				# convert content
				if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].type == 'json'
					content = JSON.stringify JSON.parse(content), null, "\t"
				else if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].decoder && generator_config.gen.file[gen_file].encoder
					switch generator_config.gen.file[gen_file].decoder
						when 'cson' then decoded_content = cson.parse content
						when 'json' then decoded_content = JSON.parse content
						when 'yaml' then decoded_content = yaml.safeLoad content
						else throw new Error "Unsupported decoder (#{generator_config.gen.file[gen_file].decoder}) for generator (#{generator_name})."
					switch generator_config.gen.file[gen_file].encoder
						when 'cson' then content = season.stringify decoded_content
						when 'json' then content = JSON.stringify decoded_content, null, "\t"
						when 'yaml' then content = yaml.safeDump decoded_content
						else throw new Error "Unsupported encoder (#{generator_config.gen.file[gen_file].decoder}) for generator (#{generator_name})."
						
				# get dest folder/file
				dest_folder = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib')
				dest_file = this.path + '/' + (if config.generators[generator_name].path then config.generators[generator_name].path else 'lib') + '/'
				if generator_config.gen && generator_config.gen.file && generator_config.gen.file[gen_file] && generator_config.gen.file[gen_file].dest
					dest_file += generator_config.gen.file[gen_file].dest
				else
					dest_file += gen_file
				
				# create dirs
				mkdirp.sync dest_folder
				
				# write to dest file
				fs.writeFileSync dest_file, content

module.exports = generate