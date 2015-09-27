fs       = require 'fs-extra'
mkdirp   = require 'mkdirp'
userHome = require 'user-home'

link = (opts) ->
  opts = opts or {}
  
  # validate opts
  if !opts.collection
    throw new Error "`collection` is required."
  else if !opts.module
    throw new Error "`module` is required."
  else if !opts.version
    throw new Error "`version` is required."
  else if !opts.src
    throw new Error "`src` is required."
  
  # get dir/dest
  dir = "#{userHome}/.autocode/module/#{opts.collection}/#{opts.module}"
  dest = "#{dir}/#{opts.version}"
  
  # check if dest exists
  if fs.existsSync(dest)
    if opts.force != true
      throw new Error "Module already installed at: #{dest}. Use -f to force link, but be careful: this entire directory will be destroyed."
    
    # delete existing dest
    fs.removeSync dest
    
  # recursively mkdir for parent folders
  if !fs.existsSync dir
    mkdirp.sync dir
  
  # display info
  console.log "Linking #{opts.collection}.#{opts.module}..."
  console.log "Source: #{opts.src}"
  console.log "Destination: #{dest}"
  
  # create symlink
  fs.symlinkSync opts.src, dest
  
  console.log "Done."
  
module.exports = link