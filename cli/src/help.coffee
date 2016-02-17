module.exports = (commands) ->
	
	# load packages
	pad = require 'pad'
	
	getCommands = () ->
		# define output
		output = "Commands:\n\n"
		
		# get longest command
		command_max = 0
		for command_name of commands
			command = commands[command_name]
			command_length = (command_name + (if command.opts then ' ' + command.opts else '')).length
			if command_length > command_max
				command_max = command_length
		command_max++
		command_max++
		
		# add each command to output
		for command_name of commands
			command = commands[command_name]
			output += '  '
			output += pad(command_name + (if command.opts then ' ' + command.opts else ''), command_max, ' ')
			output += "#{command.desc}\n"
		
		return output
		
	getCopyright = () ->
		# define output
		output = "Copyright (c) 2014-2016 Autocode. All Rights Reserved.\n"
		
	getInfo = () ->
		# add info to output
		output = "\nInfo:\n\n"
		
		# define details
		details = {
			Author: 'Chris Tate <chris@autocode.run>'
			License: 'Apache-2.0'
			Website: 'https://autocode.run'
			Repository: 'https://github.com/ctate/autocode'
		}
		
		# get longest detail
		detail_max = 0
		for detail_name of details
			detail = details[detail_name]
			detail_length = detail_name.length
			if detail_length > detail_max
				detail_max = detail_length
		detail_max++
		detail_max++
		
		# add each detail to output
		for detail_name of details
			detail = details[detail_name]
			detail_name += ':'
			output += '  ' + pad(detail_name, detail_max, ' ')
			output += "#{detail}\n"
		output += "\n"
		
	getUsage = () ->
		# define output
		output = "Usage:\n\n"
		output += "autocode [command]\n\n"
		
	# define output
	output = getUsage()
	output += getCommands()
	output += getInfo()
	output += getCopyright()
