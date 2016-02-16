# load modules
cson     = require 'season'
extend   = require 'extend-combine'
fs       = require 'fs'
marked   = require 'marked'
path     = require 'path'
readdir  = require 'fs-readdir-recursive'
skeemas  = require 'skeemas'
userHome = require 'user-home'
xml      = require 'xml-to-jsobj'
yaml     = require 'js-yaml'

setNestedPropertyValue = (obj, fields, val) ->
	fields = fields.split '.'

	cur = obj
	last = fields.pop()

	fields.forEach (field) ->
		cur[field] = {}
		cur = cur[field]
		
	cur[last] = val
	obj

init = (project_path, validate = true) ->
	# get project path
	project_path = project_path or this.path
	
	# require project path
	if !project_path
		throw new Error 'project_path for Autocode config is required'
	
	# load config
	config = load project_path
	
	if !config
		return false
	
	# get autocode path
	autocode_path = path.resolve "#{__dirname}/../.."
	
	if validate == false
		autocode_config = yaml.safeLoad fs.readFileSync("#{autocode_path}/.autocode/config.yml")
		return autocode_config.exports.ConfigSchema.schema
	else
		config_schema = this.load autocode_path, false
	
	validate = skeemas.validate config, config_schema
	if !validate.valid
		console.log "Configuration failed validation:"
		console.log(validate.errors)
		throw new Error "Invalid Configuration for path: #{project_path}"
	
	if !config.host
		config.host = 'github.com'
	
	this.config = config
	this.path = project_path
		
	config

load = (project_path) ->
	# get config
	for ext in ['yml','yaml','cson','json','xml']
		file = "#{project_path}/.autocode/config.#{ext}"
		
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
