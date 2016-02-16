# load deps
autocode = require '../autocode'

module.exports = (opts = {}) ->
  opts.ignoreOverwrite = true
  imported = this.install opts
  
  config = this.load process.cwd()
  if !config.imports
    config.imports = {}
  config.imports[imported.name] = "~#{imported.version}"
  
  this.save {
    config: config
  }
