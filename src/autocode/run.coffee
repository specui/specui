module.exports = (opts) ->
	autocode = this
	
	# load packages
	spawn = require 'cross-spawn'
	
	this.build opts
	
	if !this.config.scripts or !this.config.scripts.run
		return 'Nothing to run.'
	
	console.log "\nRUN:".bold
	
	scripts = this.config.scripts
	
	i = 0
	runCmd = () ->
		if !scripts.run[i]
			console.log "\nDone!"
			process.kill 0
			return
		
		console.log '- ' + scripts.run[i]
		
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
		proc.stderr.on 'data', (data) ->
			console.log data.toString().red
		proc.stdout.on 'error', (data) ->
			console.log data.toString()
		proc.stdout.on 'data', (data) ->
			console.log data.toString()
		#proc.on 'exit', (err) ->
		#	runCmd()
		proc.on 'close', (err) ->
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