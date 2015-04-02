module.exports = (host, uri) ->
  switch host
    when 'api'
      "https://api.crystal.sh/#{uri}"