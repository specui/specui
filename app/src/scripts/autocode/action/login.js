autocode.action.login = function() {
  var href ='https://github.com/login/oauth/authorize';
  href += '?client_id=' + autocode.data.auth.client_id;
  href += '&redirect_uri=' + autocode.data.auth.redirect_uri;
  href += '&scope=' + autocode.data.auth.scope;
  
  window.location.href = href;
};