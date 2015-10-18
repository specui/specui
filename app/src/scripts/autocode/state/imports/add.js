autocode.state['imports/add'] = function(opts) {
  autocode.fuzzy.close();
  
  if (!autocode.project.imports) {
    autocode.project.imports = {};
  }
  
  autocode.project.imports[opts.repo] = 'Loading...';
  
  autocode.state['imports']({ disableSelected: true });
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
        });
        
        autocode.state['imports']({ disableSelected: true });
        if ($(window).width() > 600) {
          autocode.state['imports/module']({ repo: opts.repo });
        }
        
        $('#imports-init').fadeOut(function() {
          $('#imports-content-container').fadeIn();
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