# load deps
crystal = {
	config: require './config'
}
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

loadImports = (imports) ->
	loaded_imports = {}
	
	# check if each import exists
	for import_id of imports
		#console.log "- #{import_id}"
		
		# get import module
		import_alias = imports[import_id]
		import_parts = import_id.split '.'
		module_name = import_parts[0]
		import_name = import_parts[1]
		
		# module is not loaded
		if !modules[module_name]
			throw new Error "Module (#{module_name}.#{import_name}) not initialized for import (#{import_parts[2]})"
		
		# get import module
		import_module = modules[module_name]
		module_id = import_module.id
		import_config = import_module.config
		import_path = import_module.path
		
		# load exported
		exported = import_config.exports[import_name]
		if !exported
			error = "Export (#{import_name}) does not exist for import (#{module_id}).\nTry these instead:"
			for module_export of import_config.exports
				error += "\n- #{module_export}"
			throw new Error error 
		
		# load child imports
		if import_config.imports
			console.log "Loading modules for #{module_id}..."
			child_modules = loadModules import_config.modules
			console.log "Loading imports for #{import_name}..."
			child_imports = loadImports import_config.imports, child_modules
		
		loaded_imports[import_alias] = exported
		loaded_imports[import_alias].imports = child_imports
		
		if !exported.type
			throw new Error "Type is required for export (#{import_name}) in module (#{module_id})"
		
		switch exported.type
			when 'configuration'
				loaded_imports[import_alias].config = exported.config
				loaded_imports[import_alias].doc = fs.readFileSync "#{import_path}/.crystal/config.yml"
			when 'engine'
				loaded_imports[import_alias].engine = require "#{import_path}/.crystal/engine/#{exported.engine}"
			when 'generator'
				if exported.engine
					loaded_imports[import_alias].engine = child_imports[exported.engine].engine
				if exported.schema && typeof(exported.schema) == 'string'
					loaded_imports[import_alias].schema = yaml.safeLoad fs.readFileSync("#{import_path}/.crystal/schema/#{exported.schema}")
				if exported.template
					loaded_imports[import_alias].template = fs.readFileSync "#{import_path}/.crystal/template/#{exported.template}", 'utf8'
				if exported.transformer
					loaded_imports[import_alias].transformer = child_imports[exported.transformer].transformer
			when 'helper'
				loaded_imports[import_alias].helper = require "#{import_path}/.crystal/helper/#{exported.helper}"
			when 'processor'
				loaded_imports[import_alias].processor = require "#{import_path}/.crystal/proc/#{exported.processor}"
			when 'transformer'
				loaded_imports[import_alias].transformer = require "#{import_path}/.crystal/trans/#{exported.transformer}"
			when 'schematic'
				loaded_imports[import_alias].schema = yaml.safeLoad fs.readFileSync("#{import_path}/.crystal/schema/#{exported.schema}")
			else throw new Error "unknown type (#{exported.type}) for export (#{import_name}) in import (#{module_id})"
				
	loaded_imports

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
				
				if typeof(exported.engine) == 'string' && exported.engine.match(/\./)
					export_path = "#{module_path}/.crystal/engine/#{exported.engine}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].engine = require export_path
				if typeof(exported.helper) == 'string' && exported.helper.match(/\./)
					export_path = "#{module_path}/.crystal/helper/#{exported.helper}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].helper = require export_path
				if typeof(exported.schema) == 'string' && exported.schema.match(/\./)
					export_path = "#{module_path}/.crystal/schema/#{exported.schema}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].schema = yaml.safeLoad fs.readFileSync(export_path)
				if typeof(exported.template) == 'string' && exported.template.match(/\./)
					export_path = "#{module_path}/.crystal/template/#{exported.template}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].template = fs.readFileSync(export_path, 'utf8')
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
				if typeof(exported.helper) == 'string'
					test = loaded_module.imports[exported.helper].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].helper = {
						callback: loaded_modules[test][loaded_module.modules[test]].exports[test2].helper
						name: loaded_modules[test][loaded_module.modules[test]].exports[test2].name
					}
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
			throw new Error "Generator is required."
		else if !imports[output.generator]
			throw new Error "Generator (#{output.generator}) does not exist."
		
		# load generator from imports
		generator = imports[output.generator]
		
		# validate filename
		if output.filename
			filename = output.filename
		else if generator.filename
			filename = generator.filename
		else
			throw new Error "Filename is required for output."
		
		# append path to filename
		if output.path
			if !fs.existsSync output.path
				mkdirp output.path
			filename = "#{output.path}/#{filename}"
		
		# validate spec
		if !output.spec
			throw new Error "Spec is required."
		
		# load spec from file
		if typeof(output.spec) == 'string'
			output.spec = yaml.safeLoad fs.readFileSync(".crystal/spec/#{output.spec}", 'utf8')
		output.spec = parse output.spec, project
		
		# validate spec
		if generator.schema
			validate = skeemas.validate output.spec, generator.schema
			if !validate.valid
				console.log validate.errors
				console.log("ERROR: Specification failed validation.")
				for error in validate.errors
					console.log "- #{error.message} for specification (#{error.context.substr(2)})"
				throw new Error "ERROR: Invalid specification."

		# get content from output
		if generator.helper
			helpers = [generator.helper]
		else
			helpers = null
		content = generator.engine output.spec, generator.template, helpers
		
		# transform content
		if output.transformer
			if typeof(output.transformer) == 'string'
				content = imports[output.transformer].transformer content
			else
				content = output.transformer content
		if generator.transformer
			content = generator.transformer content
		
			# get file/cache/ checksum
		filename_checksum = crypto.createHash('md5').update(filename, 'utf8').digest('hex')
		if fs.existsSync ".crystal/cache/#{filename_checksum}"
			if !fs.existsSync filename
				if force != true
					throw new Error "ERROR: File (#{filename}) has been manually deleted outside of Crystal. Use -f to force code generation and overwrite this deletion."
			else
				cache_checksum = fs.readFileSync(".crystal/cache/#{filename_checksum}", 'utf8')
				file_checksum = crypto.createHash('md5').update(fs.readFileSync(filename, 'utf8'), 'utf8').digest('hex')
				
				# validate checksum
				if cache_checksum != file_checksum && force != true
					throw new Error "ERROR: File (#{filename}) has been manually changed outside of Crystal. Use -f to force code generation and overwrite these changes."
		
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
		
		#console.log "- #{filename}"
		
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
		
		imports[import_alias] = loaded_modules[import_module][import_version].exports[import_name]
	
	# load outputs
	if project.outputs
		console.log "Loading outputs..."
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
