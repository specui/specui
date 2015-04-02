module.exports = (opts) ->
	
	console.log 'Syncing data...'
	
	cson = require 'season'
	fs = require 'fs'
	mkdirp = require 'mkdirp'
	userHome = require 'user-home'
	
	source = opts._[1]
	path = opts._[2] || '.'
	
	data_path = "src/data/#{source}/"
	data_files = fs.readdirSync data_path
	
	data = {}
	
	for i of data_files
		data_file = data_files[i]
		data_name = data_file.split('.')[0]
		
		results = cson.readFileSync "#{data_path}#{data_file}"
		
		data[data_name] = results
	
	console.log data