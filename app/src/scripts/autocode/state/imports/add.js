autocode.state['imports/add'] = function(opts) {
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
    
    autocode.api.releases.get({
      data: {
        repo: opts.repo
      },
      success: function(data) {
        if (!autocode.project.imports) {
          autocode.project.imports = {};
        }
        
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
        
        $('#imports-init').fadeOut(function() {
          $('#imports-content-container').fadeIn(function() {
            autocode.state['imports']();
            autocode.state['imports/module']({ repo: opts.repo });
          });
        });
      }
    });
  });
};