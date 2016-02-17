module.exports = () ->
	# load packages
	fs = require 'fs'
	
	# get files
	ascii_file = "#{__dirname}/../ascii.txt"
	version_file = "#{__dirname}/../version.txt"
	
	# get ascii text
	ascii_text = fs.readFileSync ascii_file
	if !ascii_text
		throw new Error "Unable to load ASCII text from #{ascii_file}"
	ascii_text = ascii_text.toString()
	
	# get version text
	version_text = fs.readFileSync version_file
	if !version_text
		throw new Error "Unable to load version text from #{version_file}"
	version_text = "Autocode v" + version_text.toString()
	
	# get output
	output = "\n"
	output += ascii_text
	output += "\n\n"
	output += "=".repeat 80
	output += "\n\n"
	output += " ".repeat ((80-version_text.length)/2)
	output += version_text
	output += "\n\n"
	output += "=".repeat 80
	output += "\n"
	
	output
