fs = require 'fs'
mkdirp = require 'mkdirp'
userHome = require 'user-home'
yaml = require 'js-yaml'

cache = (key, val, debug) ->
	
	crystal_path = "#{userHome}/.autocode/"
	crystal_file = "#{crystal_path}crystal.yml"
	
	crystal = if fs.existsSync crystal_file
		yaml.safeLoad fs.readFileSync(crystal_file)
	else
		{}
	
	if !crystal.cache
		crystal.cache = {}
	if val != undefined
		crystal.cache[key] = val
		fs.writeFileSync crystal_file, yaml.safeDump(crystal)
	
	if debug
		console.log "File:   #{crystal_file}"
		console.log "Method: crystal.cache(key, val)"
		console.log "Key:    #{key}"
		console.log "Value:  #{crystal.cache[key]}\n"
	
	crystal.cache[key]

module.exports = cache