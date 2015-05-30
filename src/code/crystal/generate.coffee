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

loadImports = (imports, modules) ->
	loaded_imports = {}
	
	# check if each import exists
	for import_id of imports
		console.log "- #{import_id}"
		
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
	loaded_modules = {}
	
	for module_id of modules
		console.log "- #{module_id}"
		
		module_parts = module_id.split '.'
		module_name = module_parts[module_parts.length-1]
		module_version = modules[module_id]
		
		# get/validate module path
		module_path = module_id.replace /\./g, '/'
		module_path = "#{userHome}/.crystal/module/#{module_path}/#{module_version}"
		if !fs.existsSync module_path
			throw new Error "Unknown module (#{module_id}). Try: crystal update"
		
		# get/validate module config
		module_config = crystal.config module_path
		if !module_config
			throw new Error "Unable to load configuration for module (#{module_id})"
		
		loaded_modules[module_name] = {
			id: module_id
			config: module_config
			path: module_path
			version: module_version
		}
		
	loaded_modules

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
		content = generator.engine output.spec, generator.template
		
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
		
		console.log "- #{filename}"
		
		if generator.outputs
			loadOutputs generator.outputs, generator.imports, project, force

generate = (project) ->
	console.log "Generating code from: #{this.path}"
	
	# get project
	project = project or this.project
	
	# load modules
	if project.modules
		console.log "Loading modules for #{project.name}..."
		modules = loadModules project.modules
	
	# load imports
	if project.imports
		console.log "Loading imports for #{project.name}..."
		imports = loadImports project.imports, modules
	
	# load inputs
	if project.inputs
		console.log "Loading inputs..."
		
		config = ""
		for input in project.inputs
			if !imports[input.config]
				throw new Error "Config (input.config) does not exist."
			
			extend true, true, project, imports[input.config].config
			config += imports[input.config].doc
			
			console.log "- #{input.config}"
	
	# get imports
	if project.imports
		modules = loadModules project.modules
		imports = loadImports project.imports, modules
	
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

module.exports = generate
