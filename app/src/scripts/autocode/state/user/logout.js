autocode.state['user/logout'] = function() {
  autocode.loader.open();
  
  autocode.api.logout.get({
    success: function() {
      window.location.reload();
    }
  });
};