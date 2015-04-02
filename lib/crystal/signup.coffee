prompt = require 'prompt'
request = require 'request'

signup = () ->
	console.log "Ready to signup? Let's go!"
	
	crystal = this
	
	prompt.message = ''
	prompt.delimiter = ''
	prompt.start()
	
	prompt.get {
		properties: {
			email: {
				description: 'Enter your email'
				required: true
				type: 'string'
			},
			username: {
				description: 'Enter your username'
				required: true
				type: 'string'
			},
			password: {
				description: 'Enter your password'
				hidden: true
				required: true
				type: 'string'
			}
		}
	}, (err, result) ->
		# validate result
		if !result
			throw new Error 'Email/Username/Password are required.'
		
		# validate email
		if !result.email
			throw new Error 'Email is required.'
		
		# validate username
		if !result.username
			throw new Error 'Username is required.'
		
		# validate password
		if !result.password
			throw new Error 'Password is required.'
		
		# cache username
		crystal.cache 'username', result.username
		
		request.post {
			formData: {
				email: result.email,
				username: result.username,
				password: result.password
			},
			url: crystal.url 'api', 'users'
		}, (err, resp, body) ->
			if !err && resp.statusCode == 200
				console.log "Thanks for signing up!"
			else if body.match 'duplicate'
				console.log "Username already in use. Please try again!"
			else
				console.log "Unable to signup."

module.exports = signup