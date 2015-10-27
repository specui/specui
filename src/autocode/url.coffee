module.exports = (host, uri) ->
  url = switch host
    when 'api'
      if process.env.CRYSTAL_API_URL
        process.env.CRYSTAL_API_URL
      else
        "https://api.autocode.run/"
    when 'hub'
      if process.env.CRYSTAL_HUB_URL
        process.env.CRYSTAL_HUB_URL
      else
        "https://hub.autocode.run/"
    when 'web'
      if process.env.CRYSTAL_WEB_URL
        process.env.CRYSTAL_WEB_URL
      else
        "https://autocode.run/"
  
  if !url
    throw new Error "URL does not exist for host: #{host}"
  
  if url.substr(url.length-1) != '/'
    url += '/'
  if uri
    url += uri
  
  url