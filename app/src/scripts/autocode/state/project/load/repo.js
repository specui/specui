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
        
        autocode.imports = {};
        
        var requests = [];
        for (var import_name in autocode.project.imports) {
          requests.push(
            autocode.api.config.get({
              data: {
                repo: import_name
              },
              success: function(data) {
                var imported = this.url.split('?')[1];
                imported = autocode.query.search(imported);
                
                autocode.imports[imported.repo] = jsyaml.safeLoad(data.config);
              }
            })
          );
        }
        
        $.when(requests).done(function() {
          $('#welcome').fadeOut(function() {
            autocode.state['overview']();
            
            $('#app').fadeIn();
          });
        });
      }
    });
  });
};