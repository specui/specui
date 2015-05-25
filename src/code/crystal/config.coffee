# load modules
cson    = require 'season'
extend  = require 'extend-combine'
fs      = require 'fs'
marked  = require 'marked'
readdir = require 'fs-readdir-recursive'
skeemas = require 'skeemas'
yaml    = require 'js-yaml'
xml     = require 'xml-to-jsobj'

setNestedPropertyValue = (obj, fields, val) ->
	fields = fields.split '.'

	cur = obj
	last = fields.pop()

	fields.forEach (field) ->
		cur[field] = {}
		cur = cur[field]
		
	cur[last] = val
	obj

init = (path, validate = true) ->
	# get path
	path = path or this.path
	
	# require path
	if !path
		throw new Error 'path for crystal config is required'
	
	# load config
	config = load path
	
	if !config
		return false
	
	if validate == false
		return yaml.safeLoad fs.readFileSync("/Users/ctate/.crystal/dev/crystal/.crystal/schema/#{config.exports.ConfigSchematic.schema}")
	else
		config_schema = this.config '/Users/ctate/.crystal/dev/crystal', false
	
	validate = skeemas.validate config, config_schema
	if !validate.valid
		console.log "Configuration failed validation:"
		console.log(validate.errors)
		throw new Error "Invalid Configuration for path: #{path}"
		
	config

load = (path) ->
	# get config
	for ext in ['yml','yaml','cson','json','xml']
		file = "#{path}/.crystal/config.#{ext}"
		
		if fs.existsSync file
			config = fs.readFileSync file
			
			config = switch ext
				when 'yml','yaml' then yaml.safeLoad config
				when 'cson' then cson.readFileSync file
				when 'json' then JSON.parse config
				when 'xml' then xml.parseFromString config
			
			break
	
	config

loadSrc = (file) ->
	if fs.existsSync file
		src = fs.readFileSync file
		ext = file.split '.'
		ext = ext[ext.length-1]
		
		src = switch ext
			when 'yml', 'yaml' then yaml.safeLoad fs.readFileSync(file, 'utf8')
			when 'cson' then cson.readFileSync file
			when 'json' then JSON.parse fs.readFileSync(file, 'utf8')
			when 'xml' then xml.parseFromString fs.readFileSync(file, 'utf8')
	
	src

module.exports = init
