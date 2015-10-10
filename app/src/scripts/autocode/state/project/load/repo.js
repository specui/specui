autocode.state['project/load/repo'] = function(opts) {
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
    
    autocode.repo = opts.name;
    
    autocode.api.config.get({
      data: {
        repo: opts.name
      },
      error: function(data) {
        $('#welcome').fadeOut(function() {
          $('#init').fadeIn();
        });
      },
      success: function(data) {
        autocode.project = jsyaml.safeLoad(data.config);
        
        $('#welcome').fadeOut(function() {
          $('#app').fadeIn();
        });
      }
    });
  });
};