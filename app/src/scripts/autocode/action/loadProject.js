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
        autocode.data.projects = data;
        
        new formulator({
          formula: 'formulas/forms/Name.json',
          xhr: true,
          ready: function(form) {
            form.fields.name.autocomplete = false;
            
            form.fields.name.keydown = function() {
              if (event.keyCode == 13) {
                $('#fuzzy a').first().click();
                return false;
              }
            };
            form.fields.name.keyup = function() {
              var value = $('#popup input[name="name"]').val();
              
              var project, projects = [];
              for (var project_i in autocode.data.projects) {
                project = autocode.data.projects[project_i];
                if (project.name.match(new RegExp(value, 'i'))) {
                  projects.push({
                    action: {
                      name: 'loadProject',
                      data: {
                        name: project.name
                      }
                    },
                    text: project.name
                  });
                }
              }
              
              autocode.fuzzy.open({
                rows: projects,
                target: $('#popup input[name="name"]'),
                value: value
              });
              
              $('#popup input[name="name"]').attr('placeholder', 'Search GitHub...');
            };
            
            autocode.popup.open({
              title: 'Load Project',
              content: form.toString()
            });
          }
        });
      }
    });
    
    return;
  }
  
  autocode.unload.enable();
  
  $('.app, #init').fadeOut();
  
  $('#popup input[name="name"]').val(opts.name);
  
  autocode.fuzzy.close();
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
  });
  
  autocode.repo = opts.name;
  
  var user = opts.name.split('/')[0];
  if (user == autocode.data.user.username) {
    $('#project .text').text(opts.name.split('/')[1]);
  } else {
    $('#project .text').text(opts.name);
  }
  
  if (opts.config) {
    autocode.project = opts.config;
    autocode.data.originalConfig = opts.config;
    
    autocode.data.current = {
      pin: true
    };
    autocode.data.engines = {};
    autocode.data.generators = {};
    autocode.data.schemas = {};
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
                  case 'engine': {
                    autocode.data.engines[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                    break;
                  }
                  case 'generator': {
                    autocode.data.generators[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                    break;
                  }
                  case 'schema': {
                    autocode.data.schemas[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                    break;
                  }
                }
              }
            }
          }
        })
      );
    }
    
    $.when.apply(undefined, requests).done(function() {
      autocode.data.generators = autocode.object.sort(autocode.data.generators);
      autocode.data.engines = autocode.object.sort(autocode.data.engines);
      autocode.data.schemas = autocode.object.sort(autocode.data.schemas);
      
      $('#welcome').fadeOut(function() {
        $('#overview-tab').prop('href', 'overview');
        $('#imports-tab').prop('href', 'imports');
        $('#config-tab').prop('href', 'config');
        $('#output-tab').prop('href', 'output');
        $('#interfaces-tab').prop('href', 'interfaces');
        
        $('#overview-general-subtab').prop('href', 'overview/general');
        $('#overview-author-subtab').prop('href', 'overview/author');
        
        $('header').fadeIn();
        $('#menu-project').show();
        
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
      
      var config = autocode.storage.get('config');
      if (config && config[autocode.repo]) {
        autocode.project = jsyaml.safeLoad(config[autocode.repo]);
      } else {
        autocode.project = jsyaml.safeLoad(data.config);
      }
      autocode.data.originalConfig = data.config;
      
      autocode.data.engines = {};
      autocode.data.generators = {};
      autocode.data.schemas = {};
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
              
              var import_name = imported.repo.split('/');
              if (import_name.length > 1) {
                import_name = import_name[1];
              } else {
                import_name = import_name[0];
              }
              
              data.config = jsyaml.safeLoad(data.config)
              
              autocode.imports[import_name] = data.config;
              
              if (data.config.exports) {
                for (var export_name in data.config.exports) {
                  switch (data.config.exports[export_name].type) {
                    case 'engine': {
                      autocode.data.engines[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                      break;
                    }
                    case 'generator': {
                      autocode.data.generators[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                      break;
                    }
                    case 'schema': {
                      autocode.data.schemas[imported.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(data.config.exports[export_name]));
                      break;
                    }
                  }
                }
              }
            }
          })
        );
      }
      
      $.when.apply(undefined, requests).done(function() {
        autocode.data.engines = autocode.object.sort(autocode.data.engines);
        autocode.data.generators = autocode.object.sort(autocode.data.generators);
        autocode.data.schemas = autocode.object.sort(autocode.data.schemas);
        
        $('#welcome').fadeOut(function() {
          document.title = autocode.repo + ' | Autocode';
          
          $('#overview-tab').prop('href', opts.name + '/overview');
          $('#imports-tab').prop('href', opts.name + '/imports');
          $('#exports-tab').prop('href', opts.name + '/exports');
          $('#outputs-tab').prop('href', opts.name + '/outputs');
          $('#interfaces-tab').prop('href', opts.name + '/interfaces');
          $('#scripts-tab').prop('href', opts.name + '/scripts');
          $('#config-tab').prop('href', opts.name + '/config');
          $('#output-tab').prop('href', opts.name + '/output');
          
          $('#overview-general-subtab').prop('href', opts.name + '/overview/general');
          $('#overview-author-subtab').prop('href', opts.name + '/overview/author');
                    
          $('header').fadeIn();
          $('#menu-project').show();
          
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