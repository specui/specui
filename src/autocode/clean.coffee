# load deps
fs = require('fs-extra')

module.exports = (opts) ->	
	console.log 'Cleaning...'
	
	# remove "lib" folder
	fs.removeSync 'lib'
	
	console.log 'Done.'
