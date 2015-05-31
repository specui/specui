module.exports = (msg) ->
	
	# load packages
	vsprintf = require('sprintf').vsprintf
	
	# convert args to array and remove first arg
	args = [].slice.apply arguments
	args.shift()
	
	# format error
	error = vsprintf msg, args
	
	# throw error
	throw new Error error