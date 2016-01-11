# load packages
path = require 'path'
spawn = require 'cross-spawn'

module.exports = () ->
  this.stopped = true
  
  if !this.config.scripts or !this.config.scripts.stop
    return 'No scripts for: stop'
  
  cwd = this.path
  
  console.log "\nSTOP:".bold
  
  scripts = this.config.scripts
  
  i = 0
  stopCmd = () ->
    if !scripts.stop[i]
      console.log "\nDone!"
      return
    
    if scripts.stop[i].title and !scripts.stop[i].command
      console.log ' STOP TITLE '.bgGreen.white + (' ' + scripts.stop[i].title + ' ').bgWhite + " \n"
      i++
      stopCmd()
      return
    
    description = scripts.stop[i].description or scripts.stop[i]
    command = scripts.stop[i].command or scripts.stop[i]
    if scripts.stop[i].path
      if scripts.stop[i].path.match /^\//
        dir = scripts.stop[i].path
      else
        dir = "#{cwd}/#{scripts.stop[i].path}"
      dir = path.normalize dir
    else
      dir = cwd
    
    console.log ' STOP SCRIPT '.bgGreen.white + (' ' + description + ' ').bgWhite + " \n" + command.gray
    
    # spawn process
    proc = spawn 'bash', ['-c', command], { cwd: dir }
    
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