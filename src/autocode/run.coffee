module.exports = (opts) ->
	autocode = this
	
	# load packages
	spawn = require 'cross-spawn'
	
	this.build opts
	
	if !this.config.scripts or !this.config.scripts.run
		return 'Nothing to run.'
	
	scripts = this.config.scripts
	
	i = 0
	runCmd = () ->
		if !scripts.run[i]
			return 'Done.'
		
		# get run cmd/arg
		run = scripts.run[i]
		run = [
			run.substr(0, run.indexOf(' ')),
			run.substr(run.indexOf(' ') + 1)
		]
		cmd = run[0]
		arg = run[1].split ' '
		
		# spawn process
		proc = spawn cmd, arg
		
		# handle process events
		proc.stdout.on 'data', (data) ->
			console.log data.toString()
		proc.on 'exit', (err) ->
			runCmd()
		proc.on 'error', (err) ->
			console.log('run error', err)
		
		runInterval = setInterval (->
			if autocode.stopped
				console.log 'Project was stopped.'
				autocode.stopped = false
				clearInterval runInterval
				proc.kill()
		), 1
		
		i++
	
	runCmd()
	
	return 'Running...'