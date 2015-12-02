autocode.action.loadImport = function(opts) {
  autocode.action.toggleColumn('imports-content', 2);
  
  autocode.data.current.import = opts.repo;
  
  $('#imports-content-container .table a').removeClass('selected');
  $('#imports-content-container .table a').eq(opts.index).addClass('selected');
  
  $('#imports-title').text(opts.repo);
  $('#imports-name .value').text(opts.repo);
  $('#imports-version .value').text(autocode.project.imports[opts.repo] || 'n/a');
  $('#imports-content-readme').text('');
  
  $('#imports-tabs, #imports-exports .imports-export').hide();
  
  autocode.loader.open();
  
  autocode.api.config.get({
    data: {
      repo: opts.repo
    },
    success: function(data) {
      // close loader
      autocode.loader.close();
      
      // load config
      var config = jsyaml.safeLoad(data.config);
      
      if (autocode.project.imports) {
        $('#imports-content-container .content-right').show();
      } else {
        $('#imports-content-container .content-right').hide();
      }
      
      $('#imports-tabs, #imports-exports .imports-export').text('').show();
      
      var tab, tabs = [], export_type;
      for (var export_name in config.exports) {
        export_type = config.exports[export_name].type + 's';
        if (tabs.indexOf(export_type) === -1) {
          tabs.push(export_type);
        }
      }
      for (var i = 0; i < tabs.length; i++) {
        tab = tabs[i];
        $('#imports-tabs').append('<a' + (i == 0 ? ' class="selected"' : '') + ' id="imports-' + tab + '-tab" onclick="autocode.action.importsTab({ name: \'' + tab + '\' })">' + tab.substr(0,1).toUpperCase() + tab.substr(1) + '</a>');
      }
      
      if (config.exports) {
        for (var export_name in config.exports) {
          switch (config.exports[export_name].type) {
            case 'engine': {
              autocode.data.engines[opts.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(config.exports[export_name]));
              break;
            }
            case 'generator': {
              autocode.data.generators[opts.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(config.exports[export_name]));
              break;
            }
            case 'schema': {
              autocode.data.schemas[opts.repo.split('/')[1] + '.' + export_name] = JSON.parse(JSON.stringify(config.exports[export_name]));
              break;
            }
          }
        }
      }
      
      for (var export_name in config.exports) {
        $('#imports-exports-' + config.exports[export_name].type + 's').append('<h2>' + export_name + '</h2><p>' + (config.exports[export_name].description ? marked(config.exports[export_name].description) : '<em>There is no description for this ' + config.exports[export_name].type + '.</em>') + '</p>');
      }
      $('#imports-exports .imports-export').hide();
      
      $('#imports-tabs a').first().click();
      
      autocode.resize.content();
    }
  });
};