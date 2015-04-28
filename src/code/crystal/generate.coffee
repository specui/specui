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

passable_modules = {}

loadModules = (modules, crystal, pass = false) ->
	# load project modules
	for mod_type of modules
		# load modules by name
		for mod_name of modules[mod_type]
			# get mod
			mod = modules[mod_type][mod_name]
			
			# pass mod
			if pass == true && !mod.pass
				continue
							
			# get mod path
			mod_path = "/Volumes/File/.crystal/"
			mod_path += switch mod_type
				when 'configurations' then 'config'
				when 'generators' then 'gen'
				when 'schematics' then 'schema'
				else throw new Error "Invalid type (#{mod_type}) for module (#{mod_name})."
			mod_path += '/'

			# get mod version
			if mod.version
				mod_version = mod.version
			else if typeof mod == 'string'
				mod_version = mod
			else
				throw new Error "Unable to determine version of #{mod_type} (#{mod_name})."
			
			# update mod path
			mod_path += "#{mod_name}/#{mod_version}"
			
			# get mod config
			mod_config = crystal.config mod_path
			
			if !mod_config
				continue
			
			if mod_config.modules
				if mod_config.modules.schematics
					for schematic_name of mod_config.modules.schematics
						# get schematic
						schematic = mod_config.modules.schematics[schematic_name]
						
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
							if !mod_config.src.schema
								mod_config.src.schema = {}
							if !mod_config.src.schema.properties
								mod_config.src.schema.properties = {}
							mod_config.src.schema.properties[schematic.schema] = extend true, true, mod_config.src.schema.properties[schematic.schema], schematic_config.src.schema
						else
							mod_config.src.schema = extend true, true, mod_config.src.schema, schematic_config.src.schema
				
				loadModules mod_config.modules, crystal, true
			
			if !passable_modules[mod_type]
				passable_modules[mod_type] = {}
			if typeof mod == 'string'
				passable_modules[mod_type][mod_name] = {
					version: mod
				}
			else
				passable_modules[mod_type][mod_name] = mod
			passable_modules[mod_type][mod_name].config = mod_config
			delete passable_modules[mod_type][mod_name].pass
	
	passable_modules

loadGen = (path, gen_name) ->
	gen_file = "#{path}/#{gen_name}.hbs"
	
	if fs.existsSync gen_file
		gen = fs.readFileSync gen_file, 'utf8'
	
	gen

generate = (project) ->
	console.log "Generating code from: #{this.path}"
	
	# get project
	project = project or this.project
	
	console.log "Loading modules..."
	
	# get modules
	modules = loadModules project.modules, this
	
	# load project modules
	for mod_type of modules
		# load modules by name
		for mod_name of modules[mod_type]
			# get mod
			mod = modules[mod_type][mod_name]
			
			if !mod.config.src
				console.log "Module (#{mod_name}) has nothing to do."
				continue
			
			# get mod path
			mod_path = "/Volumes/File/.crystal/"
			switch mod_type
				when 'configurations'
					mod_path += 'config'
				when 'generators'
					mod_path += 'gen'
			mod_path += "/#{mod_name}/#{mod.version}/src"
			
			# process spec
			if fs.existsSync "#{mod_path}/proc"
				for file in readdir "#{mod_path}/proc"
					project.src.spec = require("#{mod_path}/proc/#{file}")(project.src.spec)
					if project.src.spec == false
						throw new Error "Module (#{mod_name}) was unable to process specification."
			
			switch mod_type
				when 'configurations'
					project = extend true, true, project, mod.config.src.config
	
	# get modules
	modules = loadModules project.modules, this
	
	# load project modules
	for mod_type of modules
		console.log "Loading #{mod_type}..."
		
		# load modules by name
		for mod_name of modules[mod_type]
			console.log "- #{mod_name}"
			
			# get mod
			mod = modules[mod_type][mod_name]
			
			if !mod.config.src
				console.log "Module (#{mod_name}) has nothing to do."
				continue
			
			# get mod path
			mod_path = "/Volumes/File/.crystal/"
			switch mod_type
				when 'configurations'
					mod_path += 'config'
				when 'generators'
					mod_path += 'gen'
			mod_path += "/#{mod_name}/#{mod.version}/src"
						
			switch mod_type
				when 'generators'
					# get spec
					spec = extend true, true, {}, mod.spec, project.src.spec
					
					# validate generator's schema
					if mod.config.src.schema
						validate = skeemas.validate spec, mod.config.src.schema
						if !validate.valid
							console.log("Specification failed validation for generator (#{mod_name}):")
							for error in validate.errors
								console.log "- #{error.message} for specification (#{error.context.substr(2)})"
							throw new Error "ERROR: Invalid specification for generator (#{mod_name})."
					
					# generate files
					if mod.config.src.gen
						for gen_name of mod.config.src.gen
							gen = mod.config.src.gen[gen_name]
							gen_contents = loadGen "#{mod_path}/gen", gen_name
							content = handlebars.compile(gen_contents) spec, {
								data: project
							}
							if mod.path == '.'
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