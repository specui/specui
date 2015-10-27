#
# process.coffee
# processes crystal spec
#
# @author Chris Tate <chris@autocode.run>
# @copyright 2015 Autocode
# @license MIT
#

# load deps
crystal = {
	format: require './format'
}
changecase = require 'change-case'
cson       = require 'season'
debug      = require('debug')('build')
fs         = require 'fs'
merge      = require 'merge'
mkdirp     = require 'mkdirp'
mustache   = require 'mustache'
pluralize  = require 'pluralize'

# valid detail types
detail_types = [
	'bool'
	'child'
	'created'
	'date'
	'deleted'
	'decimal'
	'email'
	'id'
	'model'
	'number'
	'parent'
	'password'
	'select'
	'string'
	'text'
	'time'
	'updated'
]

access_exists = (role, arr) ->
	for obj in arr
		if obj.role.id == role
			return true
	false

process = (config, spec) ->
	# get config
	config = config or this.config
	if !config then throw new Error '"config" required for process(config, spec)'
	
	# get spec
	spec = spec or this.spec
	if !spec then throw new Error '"spec" required for process(config, spec)'
	
	# create gen object
	gen = {}
		
	# process models
	spec = merge.recursive spec, config.spec or {}
	if spec.models
		gen.model = {}
		gen.models = []
		
		for model_name of spec.models
			model = processModel model_name, spec
			gen.model[model_name] = model
			gen.models.push model
	
	# display processed spec in console
	#console.log JSON.stringify gen, null, "\t"
	
	gen

processModel = (model_name, spec) ->
	# get model
	model = spec.models[model_name]
	
	# pluralize model name
	if !model.plural
		model.plural = pluralize model_name
	
	model_gen = {
		access: {}
		has: {}
		id: model_name
		name: crystal.format model_name, model.plural
	}
	model_gen.model = model_gen
	
	if model.details
		model_gen.detail = {}
		model_gen.details = []
		
		for detail_name of model.details
			detail = model.details[detail_name]
			
			if !detail.plural
				detail.plural = pluralize detail_name
			
			detail_gen = {
				access: {}
				default: detail.default
				id: detail_name
				name: crystal.format detail_name, detail.plural
			}
			detail_gen.detail = detail_gen
			detail_gen.model = model_gen
			
			if model.access
				for role of model.access
					if Object.prototype.toString.call model.access[role].permissions == '[object Object]'
						role_data = {
							role: {
								access: {
									create: false
									read: false
									update: false
									delete: false
								}
								name: crystal.format role
							}
						}
						for access of model.access[role].permissions
							if model.access[role].permissions[access] == '*' or model.access[role].permissions[access].indexOf(detail_name) != -1
								if !detail_gen.access[access]
									detail_gen.access[access] = {
										roles: []
									}
								if !model_gen.access[access]
									model_gen.access[access] = {
										roles: []
									}
								if !access_exists role, detail_gen.access[access].roles
									detail_gen.access[access].roles.push {
										role: {
											id: role
											name: crystal.format(role)
										}
									}
								if !access_exists role, model_gen.access[access].roles
									model_gen.access[access].roles.push {
										role: {
											id: role,
											name: crystal.format(role)
										}
									}
						
					else if model.access[role].permissions == '*' or model.access[role].permissions.indexOf(detail_name) != -1
						if !detail_gen.access.create
							detail_gen.access.create = {
								roles: []
							}
							detail_gen.access.create.detail = detail_gen
							detail_gen.access.create.model = model_gen
						if !detail_gen.access.read
							detail_gen.access.read = {
								roles: []
							}
							detail_gen.access.read.detail = detail_gen
							detail_gen.access.read.model = model_gen
						if !detail_gen.access.update
							detail_gen.access.update = {
								roles: []
							}
							detail_gen.access.update.detail = detail_gen
							detail_gen.access.update.model = model_gen
						if !detail_gen.access.delete
							detail_gen.access.delete = {
								roles: []
							}
							detail_gen.access.delete.detail = detail_gen
							detail_gen.access.delete.model = model_gen
						
						if !access_exists role, detail_gen.access.create.roles
							detail_gen.access.create.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, detail_gen.access.read.roles
							detail_gen.access.read.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, detail_gen.access.update.roles
							detail_gen.access.update.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, detail_gen.access.delete.roles
							detail_gen.access.delete.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						
						if !model_gen.access.create
							model_gen.access.create = {
								roles: []
							}
						if !model_gen.access.read
							model_gen.access.read = {
								roles: []
							}
						if !model_gen.access.update
							model_gen.access.update = {
								roles: []
							}
						if !model_gen.access.delete
							model_gen.access.delete = {
								roles: []
							}
						
						if !access_exists role, model_gen.access.create.roles
							model_gen.access.create.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, model_gen.access.read.roles
							model_gen.access.read.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, model_gen.access.update.roles
							model_gen.access.update.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
						if !access_exists role, model_gen.access.delete.roles
							model_gen.access.delete.roles.push {
								role: {
									id: role
									name: crystal.format role
								}
							}
			
			if !detail_gen.access.create and !detail_gen.access.read and !detail_gen.access.update and !detail_gen.access.delete
				delete detail_gen.access
			
			if detail.detail
				detail_gen.association = {}
				detail_gen.association.detail = {
					name: crystal.format detail.detail
				}
			
			if detail.model
				if !detail_gen.association
					detail_gen.association = {}
				detail_gen.association.model = {
					name: crystal.format detail.model
				}
			
			if detail.multiple != undefined
				if detail.multiple == true
					detail_gen.multiple = true
				else if detail.multiple == false
					detail_gen.multiple = false
				else
					debug 'Invalid value for "multiple": %s', detail.multiple
			
			if detail.options
				detail_options = []
				for i of detail.options
					detail_options.push {
						option: detail.options[i]
					}
				detail_gen.options = detail_options
			
			if detail.required != undefined
				if detail.required == true
					detail_gen.required = true
				else if detail.required == false
					detail_gen.required = false
				else
					debug 'Invalid value for "required": %s', detail.required
			
			if detail.type
				if detail_types.indexOf(detail.type) == -1
					console.log "Unknown type (#{detail.type}) for detail (#{detail_name})"
				else
					detail_gen.is = {}
					detail_gen.is[detail.type] = true
					detail_gen.type = detail.type
					model_gen.has[detail.type] = true
			
			if detail.unique != undefined
				if detail.unique == true
					detail_gen.unique = {
						is: { bool: true }
						value: true
					}
				else if detail.unique == false
					detail_gen.unique = {
						is: { bool: true }
						value: false
					}
				else
					detail_gen.unique = {
						is: { model: true }
						model: {
							name: crystal.format detail.unique
						},
						value: detail.unique
					}
			
			model_gen.detail[detail_name] = detail_gen
			model_gen.details.push detail_gen
	
	if !model_gen.access.create and !model_gen.access.read and !model_gen.access.update and !model_gen.access.delete
		delete model_gen.access
		
	model_gen

module.exports = process