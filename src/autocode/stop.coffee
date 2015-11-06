# load packages
spawn = require 'cross-spawn'

module.exports = () ->
  this.stopped = true
  
  if !this.config.scripts or !this.config.scripts.stop
    return 'No scripts for: stop'
  
  console.log "\nSTOP:".bold
  
  scripts = this.config.scripts
  
  i = 0
  stopCmd = () ->
    if !scripts.stop[i]
      console.log "\nDone!"
      return
    
    description = scripts.stop[i].description or scripts.stop[i]
    command = scripts.stop[i].command or scripts.stop[i]
    
    console.log ' STOP SCRIPT '.bgBlack.white + (' ' + description + ' ').bgWhite + " \n" + command.gray
    
    # get stop cmd/arg
    stop = command
    stop = [
      stop.substr(0, stop.indexOf(' ')),
      stop.substr(stop.indexOf(' ') + 1)
    ]
    cmd = stop[0]
    arg = stop[1].split ' '
    
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
    #  stopCmd()
    proc.on 'close', (err) ->
      stopCmd()
    proc.on 'error', (err) ->
      console.log ' ERROR '.bgRed.white + (' ' + err.message + ' ').bgWhite
    
    i++
  
  stopCmd()
  
  return 'Stopping...'