autocode.state['output'] = function() {
  autocode.action.toggleSection('output');
  
  if (autocode.data.output) {
    $('#output-content-container .table a').slice(1).remove();
    
    var import_version;
    for (var import_name in autocode.object.sort(autocode.data.output.files)) {
      import_version = autocode.data.output.files[import_name];
      
      $('#output-content-container .table').append(
        '<a class="file" href="output/file?file=' + import_name + '">'
          + '<span class="icon" style="background-image: url(https://cdn.rawgit.com/' + import_name + '/master/.autocode/icon.svg)"></span>'
          + '<span class="info">'
            + '<span class="name">' + import_name + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#output-init').hide();
    $('#output-content-container').show();
  } else {
    $('#output-init').show();
    $('#output-content-container').hide();
  }
  
  autocode.resize.all();
};