module.exports = (path) ->
	# load deps
	cson = require 'season'
	fs = require 'fs'
	yaml = require 'js-yaml'
	
	# get path
	if !path
		if !this.path then return false
		path = "#{this.path}/src/spec"
	
	if this.config.type == 'generator'
		if this.config.specifications && this.config.specifications.default
			for i in this.config.specifications.default
				path = "#{userHome}/.autocode/spec/#{i}/src/spec"
				break
	
	spec = {}
	
	# check if model path exists
	model_path = "#{path}/model/"
	if fs.existsSync model_path
		# get model files
		model_files = fs.readdirSync model_path
		
		# add each model file to spec
		if model_files.length
			spec.models = {}
			
			for model_file in model_files
				# get model file
				model_file = model_path + model_file
				
				# get model name from model file
				model_name = model_file.split '/'
				model_name = model_name[model_name.length-1]
				model_name = model_name.split '.'
				model_name = model_name[0]
				
				# get model data from model file
				model_data = switch true
					when model_file.match(/\.yml$/i) != null, model_file.match(/\.yaml$/i) != null
						yaml.safeLoad fs.readFileSync(model_file)
					when model_file.match(/\.cson$/i) != null
						cson.readFileSync model_file
					else
						throw new Error "Unknown file format for model (#{model_name})"
								
				# add model to spec
				spec.models[model_name] = model_data
	
	#console.log JSON.stringify spec, null, "\t"
	
	spec