autocode.state['project/load/repo'] = function(opts) {
  autocode.unload.enable();
  
  $('.app, #init').fadeOut();
  
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
  });
  
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
      var recent_projects = autocode.storage.get('recent', []);
      if (recent_projects.indexOf(opts.name) !== -1) {
        recent_projects.splice(
          recent_projects.indexOf(opts.name),
          1
        );
      }
      recent_projects.push(opts.name);
      if (recent_projects.length > 3) {
        recent_projects = recent_projects.splice(recent_projects.length - 3, 3);
      }
      autocode.storage.set('recent', recent_projects);
      
      autocode.action.updateRecent();
      
      autocode.project = jsyaml.safeLoad(data.config);
      autocode.data.originalConfig = autocode.object.clone(autocode.project);
      
      autocode.data.generators = {};
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
              
              data.config = jsyaml.safeLoad(data.config)
              
              autocode.imports[imported.repo] = data.config;
              
              if (data.config.exports) {
                for (var export_name in data.config.exports) {
                  switch (data.config.exports[export_name].type) {
                    case 'generator': {
                      autocode.data.generators[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                      break;
                    }
                  }
                }
              }
            }
          })
        );
      }
      
      $.when(requests).done(function() {
        autocode.data.generators = autocode.object.sort(autocode.data.generators);
        
        $('#welcome').fadeOut(function() {
          autocode.state['overview']();
          
          $('.app').fadeIn();
          
          autocode.resize.all();
        });
      });
    }
  });
};