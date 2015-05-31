module.exports = (opts) ->
	
	# load deps
	fs = require('fs-extra')
	
	console.log 'Cleaning...'
	
	# remove "lib" folder
	fs.removeSync 'lib'
	
	console.log 'Done.'