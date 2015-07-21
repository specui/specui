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
				
				# add dir
				module_config.exports[export_name].dir = module_path
				
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
					
				# handle processor
				if typeof(exported.processor) == 'string' && exported.processor.match(/\./)
					export_path = "#{module_path}/.crystal/processor/#{exported.processor}"
					if not fs.existsSync export_path
						throw new Error "Unknown export path (#{export_path}) for export (#{export_name}) in module (#{module_name})"
					module_config.exports[export_name].processor = require export_path
				
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
				
				if exported.copy and typeof(exported.copy.engine) == 'string'
					test = loaded_module.imports[exported.copy.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].copy.engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
				
				if exported.copy and exported.copy.dest and exported.copy.dest.engine and typeof(exported.copy.dest.engine) == 'string'
					test = loaded_module.imports[exported.copy.dest.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].copy.dest.engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
				
				if typeof(exported.engine) == 'string'
					test = loaded_module.imports[exported.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
					
				if exported.filename and typeof(exported.filename.engine) == 'string'
					if !loaded_module.imports[exported.filename.engine]
						throw new Error "Import does not exist for alias (#{exported.filename.engine})"
					test = loaded_module.imports[exported.filename.engine].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].filename.engine = loaded_modules[test][loaded_module.modules[test]].exports[test2].engine
				
				if exported.helper instanceof Array
					helpers = []
					
					for helper in exported.helper
						if !loaded_module.imports[helper] and !loaded_module.exports[helper]
							throw new Error "Import does not exist for alias (#{helper})"
							
						if loaded_module.exports[helper]
							helpers.push {
								callback: loaded_module.exports[helper].helper
								name: loaded_module.exports[helper].name
							}
							
						else
							test = loaded_module.imports[helper].split('.')
							test2 = test.pop()
							test = test.join('.')
							
							helpers.push {
								callback: loaded_modules[test][loaded_module.modules[test]].exports[test2].helper
								name: loaded_modules[test][loaded_module.modules[test]].exports[test2].name
							}
					
					loaded_modules[module_name][version_name].exports[export_name].helper = helpers
					
				else if typeof(exported.helper) == 'string'
					if !loaded_module.imports[exported.helper]
						throw new Error "Import does not exist for alias (#{exported.helper})"
					
					test = loaded_module.imports[exported.helper].split('.')
					test2 = test.pop()
					test = test.join('.')
					
					if !loaded_modules[test][loaded_module.modules[test]].exports[test2]
						throw new Error "Import (#{test2}) does not exist for module (#{test})"
						
					loaded_modules[module_name][version_name].exports[export_name].helper = [{
						callback: loaded_modules[test][loaded_module.modules[test]].exports[test2].helper
						name: loaded_modules[test][loaded_module.modules[test]].exports[test2].name
					}]

				if typeof(exported.schema) == 'string'
					if !loaded_module.imports[exported.schema]
						throw new Error "Schema (#{exported.schema}) does not exist for export (#{export_name}) in module (#{module_name})"
					test = loaded_module.imports[exported.schema].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].schema = loaded_modules[test][loaded_module.modules[test]].exports[test2].schema
					
				if typeof(exported.transformer) == 'string'
					test = loaded_module.imports[exported.transformer].split('.')
					test2 = test.pop()
					test = test.join('.')
					loaded_modules[module_name][version_name].exports[export_name].transformer = loaded_modules[test][loaded_module.modules[test]].exports[test2].transformer

loadOutputs = (outputs, imports, project, force = false) ->
	if !imports
		throw new Error 'No imports available for output'
	
	for output_i of outputs
		output = outputs[output_i]
		
		# validate generator
		if !output.generator
			throw new Error "Generator is required for output in project (#{project.id})"
		else if !imports[output.generator]
			throw new Error "Generator (#{output.generator}) does not exist for output in project (#{project.id})"
		
		console.log "\nOutput ##{parseInt(output_i)+1}: #{output.generator}".bold
		
		# load generator from imports
		generator = imports[output.generator]

		# load processors
		output_processor = output.processor
		generator_processor = generator.processor
		if generator_processor
			if typeof(output_processor) == 'string'
				output_processor = [output_processor]
			if typeof(generator_processor) == 'string'
				generator_processor = [generator_processor]
				
			if output_processor && generator_processor
				output_processor = extend true, true, output_processor, generator_processor
			else
				output_processor = generator_processor
		
		if output_processor instanceof Array
			processors = []
			
			for processor in output_processor
				if !imports[processor]
					throw new Error "Import does not exist for alias (#{processor})"
				
				processors.push {
					alias: processor
					callback: imports[processor].processor
				}
			
			output_processor = processors
			
		else if typeof(output_processor) == 'string'
			if !imports[output_processor]
				throw new Error "Import does not exist for alias (#{output_processor})"
				
			output_processor = [{
				alias: output_processor
				callback: imports[output_processor].processor
			}]

		# load spec from file
		spec = {}
		if output.spec
			if typeof(output.spec) == 'object'
				spec = output.spec
			else if typeof(output.spec) == 'string'
				spec_filename = ".crystal/spec/#{output.spec}"
				if !fs.existsSync spec_filename
					throw new Error "File (#{spec_filename}) does not exist for spec in output for project (#{project.id})"
				spec = yaml.safeLoad fs.readFileSync(spec_filename, 'utf8')
			
			# parse spec variables
			console.log "Processed spec.".blue
			if project.debug
				console.log "    - Before:".green
				console.log JSON.stringify spec[i], null, "  "
			spec = parse spec, project, output_processor
			if project.debug
				console.log "    - After:".green
				console.log JSON.stringify spec[i], null, "  "
			
		# validate spec
		if generator.schema
			validate = skeemas.validate spec, generator.schema
			if !validate.valid
				console.log validate.errors
				console.log("ERROR: Specification failed validation.")
				for error in validate.errors
					console.log "- #{error.message} for specification (#{error.context.substr(2)})"
				throw new Error "ERROR: Invalid specification."
		
		# get engine
		engine = output.engine or generator.engine

		# get helpers
		if helpers
			old_helpers = helpers
		helpers = if generator.helper then generator.helper else null
		
		# get injectors
		injectors = if output.injector then output.injector else null
		
		# copy files
		if generator.copy
			if typeof(generator.copy) == 'object'
				if !generator.copy.src
					throw new Error "Copy requires source"
				copy_src = generator.copy.src
			else if typeof(generator.copy) == 'string'
				copy_src = generator.copy
			else
				throw new Error "Invalid value for copy"
			
			if generator.copy.dest
				if typeof(generator.copy.dest) == 'object'
					if !generator.copy.dest.engine
						throw new Error "Destination engine is required for copy"
					if !generator.copy.dest.value
						throw new Error "Destination value is required for copy"
					copy_dest = generator.copy.dest.engine spec, generator.copy.dest.value, helpers, old_helpers
				else if typeof(generator.copy.dest) == 'string'
					copy_dest = generator.copy.dest
				else
					throw new Error "Invalid Destination for copy"
				if copy_dest.substr(copy_dest.length - 1) != '/'
					copy_dest += '/'
			else
				copy_dest = ''
			
			copy_dir = "#{generator.dir}/.crystal/#{copy_src}"
			if !fs.existsSync copy_dir
				throw new Error "Directory (#{copy_dir}) does not exist in copy"
			
			code_files = readdir copy_dir, (x) ->
				return true
			for code_file in code_files
				copy_filename = "#{output.path}/#{copy_dest}#{code_file}"
				code_dir = copy_filename.substring 0, copy_filename.lastIndexOf('/')+1
				if !fs.existsSync code_dir
					mkdirp.sync code_dir
				fs.writeFileSync "#{copy_filename}", fs.readFileSync "#{copy_dir}/#{code_file}"
				
				console.log "Generated file: #{copy_filename}".green
		
		# validate filename
		generator_filename = output.filename or generator.filename
		if !generator_filename
			continue
		
		# get iterator
		iterator = output.iterator or generator.iterator
		if iterator
			if !spec[iterator]
				throw new Error "Iterator (#{iterator}) not found in spec for generator (#{generator}) in project (#{project.id})"
			files = []
			if spec[iterator] instanceof Array
				for file in spec[iterator]
					files.push file
			else
				for name of spec[iterator]
					files.push name
		else
			files = [generator_filename]

		for i of files
			file = files[i]
			
			if file.name
				filename_options = {
					name: file.name
				}
				file = file.name
			else
				filename_options = []
				filename_options[0] = {}
				filename_options[0][file] = spec
				file_name = null
			
			# pass filename thru engine
			if generator_filename.engine
				filename = generator_filename.engine filename_options, generator_filename.value, helpers, old_helpers
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
			template = generator.template
			
			if engine
				if iterator
					content_spec = extend true, true, {}, spec[iterator][i] or spec[iterator][file]
					if content_spec
						content_spec = extend true, true, content_spec, spec
						content_spec.name = file
					if content_spec and content_spec[iterator][file]['$injector']
						template = inject template, injectors, false
						template = inject template, content_spec[iterator][file]['$injector'], false
						template = inject template, null, true
					else
						template = inject template, injectors, true
					content = engine content_spec, template, helpers, old_helpers
				else
					if template
						template = inject template, injectors, true
					content = engine spec, template, helpers
			else if template
				template = inject template, injectors, true
				content = template
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
			
			# get cached checksums
			cache_filename = ".crystal/cache.yml"
			if fs.existsSync cache_filename
				cache = yaml.safeLoad fs.readFileSync(cache_filename, 'utf8')
				if !cache.checksum
					cache.checksum = {}
			else
				cache = {
					checksum: {}
				}
			
			# get file/cache/ checksum
			filename_checksum = crypto.createHash('md5').update(filename, 'utf8').digest('hex')
			if cache.checksum[filename_checksum]
				if !fs.existsSync filename
					if force != true
						throw new Error "ERROR: File (#{filename}) has been manually deleted outside of Crystal. Use -f to force code generation and overwrite this deletion.".red.bold
				else
					cache_checksum = cache.checksum[filename_checksum]
					file_checksum = crypto.createHash('md5').update(fs.readFileSync(filename, 'utf8'), 'utf8').digest('hex')
					
					# validate checksum
					if cache_checksum != file_checksum && force != true
						throw new Error "ERROR: File (#{filename}) has been manually changed outside of Crystal. Use -f to force code generation and overwrite these changes.".red.bold
			
			# get content checksum
			content_checksum = crypto.createHash('md5').update(content, 'utf8').digest('hex')
			
			# cache checksum
			cache.checksum[filename_checksum] = content_checksum
			fs.writeFileSync ".crystal/cache.yml", yaml.safeDump cache

			# write content to file
			file_last_path = filename.lastIndexOf('/')
			if file_last_path != -1
				mkdirp.sync filename.substr(0, file_last_path)
			fs.writeFileSync filename, content
			
			console.log "Generated file: #{filename}".green
			
			#if generator.outputs
				#loadOutputs generator.outputs, generator.imports, project, force

generate = (project) ->
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
		
		if !loaded_modules[import_module] or !loaded_modules[import_module][import_version]
			throw new Error "Unknown module (#{import_module}) for import (#{import_name}) in project (#{project.id})."
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

inject = (template, injectors, remove_injector = true) ->
	template.replace /([  |\t]+)?>>>[a-z_]*<<<\n?/ig, (injector) ->
		injector_tabs = injector.match /^[\s]+>/g
		if injector_tabs
			injector_tabs = injector_tabs[0].substr(0, injector_tabs[0].length-1)
		else
			injector_tabs = ''
		injector = injector.replace /[\s]+/g, ''
		injector = injector.substr 3, injector.length-6
		if injectors and injectors[injector]
			if injectors[injector] instanceof Array
				injected = injectors[injector].join "\n"
			else if (injectors[injector].substr(0,1) == '/' or injectors[injector].substr(0,2) == './') and fs.existsSync ".crystal/#{injectors[injector]}"
				injected = fs.readFileSync ".crystal/#{injectors[injector]}", 'utf8'
			else
				injected = injectors[injector]
			if remove_injector == true
				inject_final = ''
			else
				inject_final = "#{injector_tabs}>>>#{injector}<<<\n"
			for inj in injected.split "\n"
				inject_final += "#{injector_tabs}#{inj}\n"
			inject_final += ""
		else if remove_injector == true
			''
		else
			"#{injector_tabs}>>>#{injector}<<<\n"
		
parse = (spec, project, processors) ->
	for i of spec
		s = spec[i]
		if typeof(s) == 'object'
			spec[i] = parse(spec[i], project, processors)
		else
			if typeof(s) == 'string'
				if s.substr(0, 1) == '$' && project[s.substr(1)]
					spec[i] = project[s.substr(1)]
		if processors and processors.length
			for processor in processors
				spec[i] = processor.callback spec[i]
	spec

sortObject = (object) ->
  Object.keys(object).sort().reduce ((result, key) ->
    result[key] = object[key]
    result
  ), {}
  

module.exports = generate
