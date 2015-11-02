autocode.action.logout = function() {
  autocode.loader.open();
  
  autocode.api.logout.get({
    success: function() {
      history.pushState(null, null, '/');
      window.location.reload();
    }
  });
};