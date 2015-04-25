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

passable_dependencies = {}

loadDependencies = (dependencies, crystal, pass = false) ->
	# load project dependencies
	for dependency_type of dependencies
		# load dependencies by name
		for dependency_name of dependencies[dependency_type]
			# get dependency
			dependency = dependencies[dependency_type][dependency_name]
			
			# pass dependency
			if pass == true && !dependency.pass
				continue
							
			# get dependency path
			dependency_path = "/Volumes/File/.crystal/"
			dependency_path += switch dependency_type
				when 'configurations' then 'config'
				when 'generators' then 'gen'
				when 'schematics' then 'schema'
				else throw new Error "Invalid type (#{dependency_type}) for dependency (#{dependency_name})."
			dependency_path += '/'

			# get dependency version
			if dependency.version
				dependency_version = dependency.version
			else if typeof dependency == 'string'
				dependency_version = dependency
			else
				throw new Error "Unable to determine version of #{dependency_type} (#{dependency_name})."
			
			# update dependency path
			dependency_path += "#{dependency_name}/#{dependency_version}"
			
			# get dependency config
			dependency_config = crystal.config dependency_path
			
			if !dependency_config
				continue
			
			if dependency_config.dependencies
				if dependency_config.dependencies.schematics
					for schematic_name of dependency_config.dependencies.schematics
						# get schematic
						schematic = dependency_config.dependencies.schematics[schematic_name]
						
						# get schematic path
						schematic_path = "/Volumes/File/.crystal/schema/"

						# get schematic version
						if schematic.version
							schematic_version = schematic.version
						else if typeof schematic == 'string'
							schematic_version = schematic
						else
							throw new Error "Unable to determine version of #{schematic_type} (#{schematic_name})."
						
						# update schematic path
						schematic_path += "#{schematic_name}/#{schematic_version}"
						
						schematic_config = crystal.config schematic_path
						
						if schematic.schema
							if !dependency_config.src.schema
								dependency_config.src.schema = {}
							if !dependency_config.src.schema.properties
								dependency_config.src.schema.properties = {}
							dependency_config.src.schema.properties[schematic.schema] = extend true, true, dependency_config.src.schema.properties[schematic.schema], schematic_config.src.schema
						else
							dependency_config.src.schema = extend true, true, dependency_config.src.schema, schematic_config.src.schema
				
				loadDependencies dependency_config.dependencies, crystal, true
			
			if !passable_dependencies[dependency_type]
				passable_dependencies[dependency_type] = {}
			if typeof dependency == 'string'
				passable_dependencies[dependency_type][dependency_name] = {
					version: dependency
				}
			else
				passable_dependencies[dependency_type][dependency_name] = dependency
			passable_dependencies[dependency_type][dependency_name].config = dependency_config
			delete passable_dependencies[dependency_type][dependency_name].pass
	
	passable_dependencies

loadGen = (path, gen_name) ->
	gen_file = "#{path}/#{gen_name}.hbs"
	
	if fs.existsSync gen_file
		gen = fs.readFileSync gen_file, 'utf8'
	
	gen

generate = (project) ->
	console.log "Generating code from: #{this.path}"
	
	# get project
	project = project or this.project
	
	console.log "Loading dependencies..."
	
	# get dependencies
	dependencies = loadDependencies project.dependencies, this
	
	# load project dependencies
	for dependency_type of dependencies
		# load dependencies by name
		for dependency_name of dependencies[dependency_type]
			# get dependency
			dependency = dependencies[dependency_type][dependency_name]
			
			if !dependency.config.src
				console.log "Dependency (#{dependency_name}) has nothing to do."
				continue
			
			# get dependency path
			dependency_path = "/Volumes/File/.crystal/"
			switch dependency_type
				when 'configurations'
					dependency_path += 'config'
				when 'generators'
					dependency_path += 'gen'
			dependency_path += "/#{dependency_name}/#{dependency.version}/src"
			
			switch dependency_type
				when 'configurations'
					project = extend true, true, project, dependency.config.src.config
	
	# get dependencies
	dependencies = loadDependencies project.dependencies, this
	
	# load project dependencies
	for dependency_type of dependencies
		console.log "Loading #{dependency_type}..."
		
		# load dependencies by name
		for dependency_name of dependencies[dependency_type]
			console.log "- #{dependency_name}"
			
			# get dependency
			dependency = dependencies[dependency_type][dependency_name]
			
			if !dependency.config.src
				console.log "Dependency (#{dependency_name}) has nothing to do."
				continue
			
			# get dependency path
			dependency_path = "/Volumes/File/.crystal/"
			switch dependency_type
				when 'configurations'
					dependency_path += 'config'
				when 'generators'
					dependency_path += 'gen'
			dependency_path += "/#{dependency_name}/#{dependency.version}/src"
			
			switch dependency_type
				when 'generators'
					# get spec
					spec = extend true, true, {}, dependency.spec, project.src.spec
					
					# validate generator's schema
					if dependency.config.src.schema
						validate = skeemas.validate spec, dependency.config.src.schema
						if !validate.valid
							console.log("Specification failed validation for generator (#{dependency_name}):")
							for error in validate.errors
								console.log "- #{error.message} for specification (#{error.context.substr(2)})"
							throw new Error "ERROR: Invalid specification for generator (#{dependency_name})."
					
					# generate files
					if dependency.config.src.gen
						for gen_name of dependency.config.src.gen
							gen = dependency.config.src.gen[gen_name]
							gen_contents = loadGen "#{dependency_path}/gen", gen_name
							content = handlebars.compile(gen_contents) spec, {
								data: project
							}
							if dependency.path == '.'
								dest_path = ''
							else
								dest_path = '/lib'
							
							if !fs.existsSync "#{this.path}#{dest_path}"
								mkdirp "#{this.path}#{dest_path}"
							fs.writeFileSync "#{this.path}#{dest_path}/#{gen.dest}", content

sortObject = (object) ->
	Object.keys(object).sort().reduce ((result, key) ->
		result[key] = object[key]
		result
	), {}

module.exports = generate