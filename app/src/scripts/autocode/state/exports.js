autocode.state['exports'] = function() {
  if (autocode.project.exports) {
    $('#exports-content-container .table a').slice(1).remove();
    
    var exported;
    for (var export_name in autocode.project.exports) {
      exported = autocode.project.exports[export_name];
      
      $('#exports-content-container .table').append(
        '<a class="file" href="exports/export?export=' + export_name + '">'
          + '<span class="icon ' + exported.type + '-icon"></span>'
          + '<span class="info">'
            + '<span class="name">' + export_name + '</span>'
            + '<span class="generator">' + exported.type + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#exports-init').hide();
    $('#exports-content-container').show();
    
    $('#exports-content-container .table a').eq(1).click();
    
  } else {
    $('#exports-init').show();
    $('#exports-content-container').hide();
  }
  
  autocode.action.toggleSection('exports');
};