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
      process.kill 0
      return
    
    console.log '- ' + scripts.stop[i]
    
    # get stop cmd/arg
    stop = scripts.stop[i]
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
      console.log('stop error', err)
    
    i++
  
  stopCmd()
  
  return 'Stopping...'