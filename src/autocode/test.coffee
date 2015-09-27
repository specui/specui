autocode = require '../autocode'
fs       = require 'fs-extra'
diffMark = require 'diff-mark'

test = (opts) ->
  # store path
  this.path = switch true
    when opts && opts._ && opts._[1] then opts._[1]
    when opts && typeof opts.path == 'string' then opts.path
    when this.path != undefined then this.path
    else process.cwd()
  
  # get test dir
  test_dir = "#{this.path}/src/test"
  if !fs.existsSync test_dir
    console.log "Test Directory (#{test_dir}) does not exist."
    return
    
  # get test folders
  folders = fs.readdirSync test_dir
  
  failed_tests = []
  
  for folder in folders
    project = new autocode "#{test_dir}/#{folder}"
    project.build()
    
    # get files
    files = fs.readdirSync "#{test_dir}/#{folder}/out"
    
    for file in files
      if fs.lstatSync("#{test_dir}/#{folder}/out/#{file}").isDirectory()
        continue
      
      outContent = fs.readFileSync "#{test_dir}/#{folder}/out/#{file}"
      libContent = fs.readFileSync "#{test_dir}/#{folder}/lib/#{file}"
      
      diff = diffMark.diff(outContent.toString('utf8'), libContent.toString('utf8'))
      if diff.length > 0
        failed_tests.push "Test (#{folder}) failed for file (#{file})."
  
  if failed_tests.length
    console.log failed_tests
  else
    console.log "All tests passed for: #{this.path}"
  
  fs.removeSync "#{test_dir}/#{folder}/lib"

module.exports = test