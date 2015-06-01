# load deps
crystal = {
	config: require './config'
}
colors       = require 'colors'
crypto       = require 'crypto'
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

loaded_modules = {}

loadModules = (modules) ->
	# load each module
	for module_id of modules
		# get module name/version
		module_parts = module_id.split '.'
		module_name = module_parts[module_parts.length-1]
		module_version = modules[module_id]
		
		# module already loaded
		if loaded_modules[module_id] and loaded_modules[module_id][module_version]
			continue
		
		# load module
		#console.log "- #{module_id}@#{module_version}"
		
		# create module object
		if !loaded_modules[module_id]
			loaded_modules[module_id] = {}
		
		# get/validate module path
		module_path = module_id.replace /\./g, '/'
		module_path = "#{userHome}/.crystal/module/#{module_path}/#{module_version}"
		if !fs.existsSync module_path
			throw new Error "Unknown module (#{module_id}). Try: crystal update"
		
		# get/validate module config
		module_config = crystal.config module_path
		if !module_config
			throw new Error "Unable to load configuration for module (#{module_id})"
		
		# load exports
		if module_config.exports
			for export_name of module_config.exports
				exported = module_config.exports[export_name]
				
				# handle engine
				if typeof(exported.engine) == 'string' && exported.engine.match(/\./)
					export_path = "#{module_path}/.crystal/engine/#{exported.engine}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].engine = require export_path
					
				# handle helper
				if typeof(exported.helper) == 'string' && exported.helper.match(/\./)
					export_path = "#{module_path}/.crystal/helper/#{exported.helper}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].helper = require export_path
				
				# handle schema
				if typeof(exported.schema) == 'string' && exported.schema.match(/\./)
					export_path = "#{module_path}/.crystal/schema/#{exported.schema}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].schema = yaml.safeLoad fs.readFileSync(export_path)
				
				# handle template
				if typeof(exported.template) == 'string' && exported.template.match(/\./)
					export_path = "#{module_path}/.crystal/template/#{exported.template}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].template = fs.readFileSync(export_path, 'utf8')
				
				# handle transformer
				if typeof(exported.transformer) == 'string' && exported.transformer.match(/\./)
					export_path = "#{module_path}/.crystal/trans/#{exported.transformer}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].transformer = require export_path
		
		# add module to loaded modules
		loaded_modules[module_id][module_version] = module_config
		
		# load submodules
		if module_config.modules
			loadModules module_config.modules
	
	loaded_modules = sortObject(loaded_modules)

processModules = () ->
	for module_name of loaded_modules
		module_versions = loaded_modules[module_name]
		for version_name of module_versions
			loaded_module = module_versions[version_name]
			
			for export_name of loaded_module.exports
				exported = loaded_module.exports[export_name]
				
				if typeof(exported.engine) == 'string'
					test = loaded_module.imports[exported.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
					
				if exported.filename and typeof(exported.filename.engine) == 'string'
					test = loaded_module.imports[exported.filename.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].filename.engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
				
				if exported.helper instanceof Array
					helpers = []
					
					for helper in exported.helper
						test = loaded_module.imports[helper].split('.')
						test2 = test.pop()
						test = test.join('.')
						
						helpers.push {
							callback: loaded_modules[test][loaded_module.modules[test]].exports[test2].helper
							name: loaded_modules[test][loaded_module.modules[test]].exports[test2].name
						}
					
					loaded_modules[module_name][version_name].exports[export_name].helper = helpers
					
				else if typeof(exported.helper) == 'string'
					test = loaded_module.imports[exported.helper].split('.')
					test2 = test.pop()
					test = test.join('.')
					
					loaded_modules[module_name][version_name].exports[export_name].helper = [{
						callback: loaded_modules[test][loaded_module.modules[test]].exports[test2].helper
						name: loaded_modules[test][loaded_module.modules[test]].exports[test2].name
					}]
					
				if typeof(exported.transformer) == 'string'
					test = loaded_module.imports[exported.transformer].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].transformer = loaded_modules[test][loaded_module.modules[test]].exports[test2].transformer

loadOutputs = (outputs, imports, project, force = false) ->
	if !imports
		throw new Error 'No imports available for output'
	
	for output in outputs
		# validate generator
		if !output.generator
			throw new Error "Generator is required for output in project (#{project.id})"
		else if !imports[output.generator]
			throw new Error "Generator (#{output.generator}) does not exist for output in project (#{project.id})"
		
		# load generator from imports
		generator = imports[output.generator]
		
		# validate filename
		generator_filename = output.filename or generator.filename
		if !generator_filename
			throw new Error "Filename is required for output in project (#{project.id})."
		
		# load spec from file
		if output.spec
			if typeof(output.spec) == 'object'
				spec = output.spec
			else if typeof(output.spec) == 'string'
				spec_filename = ".crystal/spec/#{output.spec}"
				if !fs.existsSync spec_filename
					throw new Error "File does not exist for spec in output for project (#{project.id})"
				spec = yaml.safeLoad fs.readFileSync(spec_filename, 'utf8')
			
			# parse spec variables
			spec = parse spec, project
		
		# get iterator
		iterator = output.iterator or generator.iterator
		if iterator
			if !spec[iterator]
				throw new Error "Iterator (#{iterator}) not found in spec for generator (#{generator}) in project (#{project.id})"
			files = []
			if spec[iterator] instanceof Array
				for file in spec[iterator]
					files.push file.name
			else
				for name of spec[iterator]
					files.push name
		else
			# validate spec
			if generator.schema
				validate = skeemas.validate spec, generator.schema
				if !validate.valid
					console.log validate.errors
					console.log("ERROR: Specification failed validation.")
					for error in validate.errors
						console.log "- #{error.message} for specification (#{error.context.substr(2)})"
					throw new Error "ERROR: Invalid specification."
					
			files = [generator_filename]

		# get engine
		engine = output.engine or generator.engine

		# get helpers
		helpers = if generator.helper then generator.helper else null
		
		for i of files
			file = files[i]
			
			# pass filename thru engine
			if generator_filename.engine
				filename_options = {}
				if file
					filename_options.name = file
				filename = generator_filename.engine filename_options, generator_filename.value, helpers

			else
				filename = generator_filename
				
			# append path to filename
			if output.path
				if !fs.existsSync output.path
					mkdirp output.path
				filename = "#{output.path}/#{filename}"
			
			# validate spec
			if !spec
				throw new Error "Spec is required."
			
			# get content from output
			if engine
				if iterator
					if spec[iterator][file]
						spec[iterator][file].name = file
					content = engine spec[iterator][file], generator.template, helpers
				else
					content = engine spec, generator.template, helpers
			else if generator.template
				content = generator.template
			else if spec
				content = spec
			else
				content = ""
			
			# transform content
			transformer = output.transformer or generator.transformer
			if transformer
				if typeof(transformer) == 'string'
					if !imports[output.transformer]
						throw new Error "Transformer #{transformer} does not exist"
					transformer = imports[output.transformer]
				content = transformer content
			else if typeof(content) == 'object'
				content = ""
			
				# get file/cache/ checksum
			filename_checksum = crypto.createHash('md5').update(filename, 'utf8').digest('hex')
			if fs.existsSync ".crystal/cache/#{filename_checksum}"
				if !fs.existsSync filename
					if force != true
						throw new Error "ERROR: File (#{filename}) has been manually deleted outside of Crystal. Use -f to force code generation and overwrite this deletion.".red.bold
				else
					cache_checksum = fs.readFileSync(".crystal/cache/#{filename_checksum}", 'utf8')
					file_checksum = crypto.createHash('md5').update(fs.readFileSync(filename, 'utf8'), 'utf8').digest('hex')
					
					# validate checksum
					if cache_checksum != file_checksum && force != true
						throw new Error "ERROR: File (#{filename}) has been manually changed outside of Crystal. Use -f to force code generation and overwrite these changes.".red.bold
			
			# get content checksum
			content_checksum = crypto.createHash('md5').update(content, 'utf8').digest('hex')
			
			# cache checksum
			if !fs.existsSync ".crystal/cache"
				mkdirp.sync ".crystal/cache"
			fs.writeFileSync ".crystal/cache/#{filename_checksum}", content_checksum

			# write content to file
			file_last_path = filename.lastIndexOf('/')
			if file_last_path != -1
				mkdirp.sync filename.substr(0, file_last_path)
			fs.writeFileSync filename, content
			
			console.log "- #{filename}".green
			
			#if generator.outputs
				#loadOutputs generator.outputs, generator.imports, project, force

generate = (project) ->
	console.log "Generating code from: #{this.path}"
	
	# get project
	project = project or this.project
	
	# load modules
	if project.modules
		#console.log "Loading modules for #{project.name}..."
		loadModules project.modules
		processModules()
	
	imports = {}
	for import_alias of project.imports
		import_parts = project.imports[import_alias].split('.')
		import_name = import_parts.pop()
		import_module = import_parts.join('.')
		import_version = project.modules[import_module]
		
		if !loaded_modules[import_module]
			throw new Error "Unknown module for import (#{import_alias})."
		else if !loaded_modules[import_module][import_version].exports
			throw new Error "Module (#{import_alias}) has no exports."
		else if !loaded_modules[import_module][import_version].exports[import_name]
			error = "Unknown export (#{import_name}) for module (#{import_module}). Try:"
			for export_name of loaded_modules[import_module][import_version].exports
				error += "\n- #{export_name}"
			throw new Error error.red
		
		imports[import_alias] = loaded_modules[import_module][import_version].exports[import_name]
	
	# load outputs
	if project.outputs
		console.log "Loading outputs...".bold
		loadOutputs project.outputs, imports, project, this.force

parse = (spec, project) ->
	for i of spec
		s = spec[i]
		if typeof(s) == 'object'
			spec[i] = parse(spec[i], project)
		else if typeof(s) == 'string'
			if s.substr(0, 1) == '$' && project[s.substr(1)]
				spec[i] = project[s.substr(1)]
	spec

sortObject = (object) ->
  Object.keys(object).sort().reduce ((result, key) ->
    result[key] = object[key]
    result
  ), {}
  

module.exports = generate
