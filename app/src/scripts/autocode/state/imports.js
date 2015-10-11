autocode.state['imports'] = function() {
  if (autocode.project.imports) {
    $('#imports-content-container .table a').slice(1).remove();
    
    var import_version;
    for (var import_name in autocode.object.sort(autocode.project.imports)) {
      import_version = autocode.project.imports[import_name];
      
      $('#imports-content-container .table').append(
        '<a class="file" href="imports/module?repo=' + import_name + '">'
          + '<span class="icon" style="background-image: url(https://cdn.rawgit.com/' + import_name + '/master/.autocode/icon.svg)"></span>'
          + '<span class="info">'
            + '<span class="name">' + import_name + '</span>'
            + '<span class="generator">' + import_version + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#imports-init').hide();
    $('#imports-content-container').show();
  } else {
    $('#imports-init').show();
    $('#imports-content-container').hide();
  }
  
  autocode.action.toggleSection('imports');
};