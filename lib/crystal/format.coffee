module.exports = (singular, plural) ->
	
	# load packages
	changecase = require 'change-case'
	pluralize = require 'pluralize'
	
	# validate singular
	if !singular or !singular.length
		throw new Error '"singular" is required in crystal.build.format()'
	
	# validate plural
	plural = plural or pluralize singular
	
	# set cases
	cases = [
		'camel'
		'constant'
		'dot'
		'lower'
		'param'
		'pascal'
		'path'
		'sentence'
		'snake'
		'swap'
		'title'
		'ucFirst'
		'upper'
	]
	
	# change case
	change = (str) ->
		changes = {}
		for c in cases
			changes[c.toLowerCase()] = changecase[c] str
		changes
	
	# get format
	format = change singular
	format.plural = change plural
	
	format