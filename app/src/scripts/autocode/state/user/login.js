autocode.state['user/login'] = function() {
  window.location.href = 'https://github.com/login/oauth/authorize?client_id=1a72d9c6a9602772d577&redirect_uri=http://alpha.crystal.sh:8080/accounts/connect/github&scope=user:email,public_repo';
};