# load deps
fs       = require 'fs'
path     = require 'path'
skeemas  = require 'skeemas'
yaml     = require 'js-yaml'

validate = (config) ->
  crystal_path = path.resolve "#{__dirname}/../.."
  config_schema = yaml.safeLoad fs.readFileSync("#{crystal_path}/.autocode/config.yml")
  config_schema = config_schema.exports.ConfigSchema.schema
  
  validate = skeemas.validate config, config_schema
  validate
  
module.exports = validate