cson = require 'season'
fs = require 'fs'
mkdirp = require 'mkdirp'
userHome = require 'user-home'

module.exports = (opts) ->
		
	key = opts._[1]
	method = opts._[2]
	value = opts._[3]
	
	crystal_path = "#{userHome}/.autocode/"
	crystal_file = "#{crystal_path}crystal.cson"
	
	crystal = if fs.existsSync crystal_file then cson.readFileSync crystal_file else {}
		
	if !crystal.default
		crystal.default = {}
	if !crystal.default[key]
		crystal.default[key] = []
	
	switch method
		when 'add'
			crystal.default[key][value] = {
				path: '.'
				version: 'latest'
			}
		when 'remove'
			delete(crystal.default[key][value])
		else
			return crystal.default[key]
	
	mkdirp.sync crystal_path
	fs.writeFileSync crystal_file, cson.stringifySync(crystal)
	
	crystal.default[key]