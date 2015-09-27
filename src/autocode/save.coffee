fs     = require 'fs'
mkdirp = require 'mkdirp'
yaml   = require 'js-yaml'

save = () ->
  if !fs.existsSync "#{this.path}/.autocode"
    mkdirp.sync "#{this.path}/.autocode"
  
  # process config
  config = JSON.parse JSON.stringify(this.config)
  if config.host == 'github.com'
    delete config.host
  delete config.path
  config = yaml.safeDump config
  
  fs.writeFileSync "#{this.path}/.autocode/config.yml", config

module.exports = save