module.exports = (version) ->
	
	# load packages
	findVersions = require 'find-versions'
	
	# get version
	versions = findVersions version, { loose: true }
	if !versions.length
		return null
	version = versions[0]