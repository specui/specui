fs     = require 'fs'
mkdirp = require 'mkdirp'
yaml   = require 'js-yaml'

save = () ->
  if !fs.existsSync "#{this.path}/.crystal"
    mkdirp.sync "#{this.path}/.crystal"
  
  # process config
  config = JSON.parse JSON.stringify(this.config)
  if config.host == 'github.com'
    delete config.host
  delete config.path
  config = yaml.safeDump config
  
  fs.writeFileSync "#{this.path}/.crystal/config.yml", config

module.exports = save