autocode.state['project/load/repo'] = function(opts) {
  $('#app, #init').fadeOut();
  
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
    
    autocode.repo = opts.name;
    
    $('#menu .text').text(opts.name);
    
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
          autocode.state['overview']();
          
          $('#app').fadeIn();
        });
      }
    });
  });
};