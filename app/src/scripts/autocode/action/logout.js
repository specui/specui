autocode.action.logout = function() {
  $('#login-option .button').text('Logging out...');
  
  $('#welcome').fadeIn();
  
  autocode.api.logout.get({
    success: function() {
      history.pushState(null, null, '/');
      window.location.reload();
    }
  });
};