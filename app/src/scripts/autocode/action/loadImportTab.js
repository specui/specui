autocode.action.loadImportTab = function(opts) {
  $('#imports-content-container aside nav a').removeClass('selected');
  $('#imports-' + opts.tab).addClass('selected');
  
  autocode.data.current.importTab = opts.tab;
  
  var populateImports = function(repos) {
    $('#imports-content-container .table').empty();
    
    var repo, row_image, row_info, repo_row;
    for (var i = 0; i < repos.length; i++) {
      repo = repos[i];
      
      repo_row = $(document.createElement('a'));
      repo_row.addClass('file');
      if (autocode.data.current.import == repo.name) {
        repo_row.addClass('selected');
      }
      repo_row.data('repo', repo.name);
      repo_row.on('click', function() {
        autocode.action.loadImport({ index: $(this).index(), repo: $(this).data('repo') });
      });
      
      row_button = $(document.createElement('button'));
      if (autocode.project.imports && autocode.project.imports[repo.name]) {
        row_button.addClass('delete');
        row_button.text('-');
        row_button.on('click', function() {
          autocode.data.current.import = $(this).parents('a').data('repo');
          autocode.action.removeImport();
        });
      } else {
        row_button.removeClass('delete');
        row_button.text('+');
        row_button.on('click', function() {
          autocode.action.addImport({ repo: $(this).parents('a').data('repo') });
        });
      }
      row_button.attr('type', 'button');
      repo_row.append(row_button);
      
      row_image = $(document.createElement('span'));
      row_image.addClass('image');
      row_image.html('<span class="icon" style="background-image: url(' + autocode.url.api('icons/' + repo.name) + '?default=' + encodeURIComponent('//app.autocode.run/images/icon/github.svg') + ')"></span>');
      repo_row.append(row_image);
      
      row_info = $(document.createElement('span'));
      row_info.addClass('info');
      row_info.html('<span class="name">' + repo.name + (repo.private ? ' (private)' : '') + '</span>');
      if (repo.version) {
        row_info.append('<span class="generator">' + repo.version + '</span>');
      }
      repo_row.append(row_info);
      
      $('#imports-content-container .table').append(repo_row);
    }
    
    autocode.resize.content();
  };
  
  switch (autocode.data.current.importTab) {
    case 'mine': {
      if (autocode.data.globalImports) {
        populateImports(autocode.data.globalImports);
      } else {
        autocode.api.repos.get({
          success: function(repos) {
            autocode.data.globalImports = repos;
            populateImports(autocode.data.globalImports);
          }
        });
      }
      break;
    }
    case 'public': {
      if (autocode.data.modules) {
        populateImports(autocode.data.modules);
      } else {
        autocode.api.modules.get({
          success: function(modules) {
            autocode.data.modules = modules;
            populateImports(autocode.data.modules);
          }
        });
      }
      break;
    }
    default: {
      var repo, repos = [], temp_repos = autocode.object.sort(autocode.project.imports);
      for (var import_name in autocode.project.imports) {
        repo = {
          name: import_name,
          version: autocode.project.imports[import_name]
        };
        repos.push(repo);
      }
      populateImports(repos);
      break;
    }
  }
  
};