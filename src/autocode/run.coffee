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
		
		description = scripts.run[i].description or scripts.run[i]
		command = scripts.run[i].command or scripts.run[i]
		
		console.log ' RUN SCRIPT '.bgBlack.white + (' ' + description + ' ').bgWhite + " \n" + command.gray
		
		# get run cmd/arg
		run = command
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
			console.log ' ERROR '.bgRed.white + (' ' + err.message + ' ').bgWhite
		
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