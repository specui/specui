module.exports = () ->
	
	# load packages
	fs = require 'fs'
	
	# get ascii file
	file = "#{__dirname}/ascii.txt"
	
	# get ascii text
	text = fs.readFileSync file
	if !text
		throw new Error "Unable to load ASCII text from #{file}"
	text = text.toString()