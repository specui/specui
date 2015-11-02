autocode.action.loadProject = function(opts) {
  opts = opts || {};
  
  autocode.popover.close();
  
  // ask to close project before loading another
  if (opts.force !== true && autocode.data.originalConfig && autocode.project && autocode.data.originalConfig != jsyaml.safeDump(autocode.project)) {
    autocode.popup.open({
      title: 'Close Project',
      content: '<div style="padding-bottom: 15px">Are you sure you want to close this project and load another? <b>You will lose all unsaved changes.</b></div>'
        + '<button onclick="autocode.action.closePopup()">No, Keep It Open</button> <a class="button secondary" onclick="autocode.action.loadProject({ force: true })">Yes, Close Project</a> <a class="button secondary" href="project/diff">View Unsaved Changes</a>'
    });
    return;
  }
  
  // get projects to load
  if (!opts.name) {
    autocode.popup.open({
      title: 'Loading...'
    });
    
    autocode.api.repos.get({
      success: function(data) {
        var rows = [];
        
        for (var i = 0; i < data.length; i++) {
          rows.push({
            icon: 'login-icon',
            state: data[i].name,
            text: data[i].name
          });
        }
        
        autocode.popup.open({
          title: 'Load Project',
          rows: rows,
          style: 'table'
        });
      }
    });
    
    return;
  }
  
  autocode.unload.enable();
  
  $('.app, #init').fadeOut();
  
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
  });
  
  autocode.repo = opts.name;
  
  $('#menu .text').text(opts.name);
  
  if (opts.config) {
    autocode.project = opts.config;
    autocode.data.originalConfig = opts.config;
    
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
        $('#overview-tab').prop('href', 'overview');
        $('#imports-tab').prop('href', 'imports');
        $('#config-tab').prop('href', 'config');
        $('#output-tab').prop('href', 'output');
        
        $('#overview-general-subtab').prop('href', 'overview/general');
        $('#overview-author-subtab').prop('href', 'overview/author');
        
        $('#build-icon, #run-icon').show();
        
        autocode.state['overview']();
        
        $('.app').fadeIn();
        
        if (opts.callback) {
          opts.callback();
        }
        
        autocode.resize.all();
      });
    });
    
    return;
  }
  
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
      autocode.data.originalConfig = data.config;
      
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
          $('#overview-tab').prop('href', opts.name + '/overview');
          $('#imports-tab').prop('href', opts.name + '/imports');
          $('#config-tab').prop('href', opts.name + '/config');
          $('#output-tab').prop('href', opts.name + '/output');
          
          $('#overview-general-subtab').prop('href', opts.name + '/overview/general');
          $('#overview-author-subtab').prop('href', opts.name + '/overview/author');
          
          $('#build-icon, #run-icon').show();
          
          autocode.state['overview']();
          
          $('.app').fadeIn();
          
          if (opts.callback) {
            opts.callback();
          }
          
          autocode.resize.all();
        });
      });
    }
  });
};