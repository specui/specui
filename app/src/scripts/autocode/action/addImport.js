autocode.action.addImport = function(opts) {
  autocode.fuzzy.close();
  
  if (!autocode.project.imports) {
    autocode.project.imports = {};
  }
  
  // add repo to imports
  autocode.project.imports[opts.repo] = 'Loading...';
  
  // sort imports
  autocode.project.imports = autocode.object.sort(autocode.project.imports);
  
  autocode.state['imports']({ disableSelected: true, tab: autocode.data.current.importTab });
  $('#imports-search').val('');
  $('#imports-content-readme').text('');
  
  var add = function() {
    autocode.api.releases.get({
      data: {
        repo: opts.repo
      },
      success: function(data) {
        autocode.project.imports[opts.repo] = '~' + data[0].substr(1);
        
        autocode.api.config.get({
          data: {
            repo: opts.repo
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
            
            // sort imports
            autocode.project.imports = autocode.object.sort(autocode.project.imports);
            
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
            
            autocode.state['imports']({ disableSelected: true, tab: autocode.data.current.importTab });
            if ($(window).width() > autocode.mobile.minWidth) {
              autocode.action.loadImport({ repo: opts.repo });
            }
            
            $('#imports-init').fadeOut(function() {
              $('#imports-content-container').fadeIn();
            });
          }
        });
      }
    });
  };
  
  if ($('#popup').length) {
    $('#popup, #overlay').fadeOut(add);
  } else {
    add();
  }
};