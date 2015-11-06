autocode.state['scripts'] = function() {
  if (autocode.project.scripts) {
    $('#scripts-content-container .table a').slice(1).remove();
    
    var script, script_name;
    for (var script_name in autocode.project.scripts) {
      script = autocode.project.scripts[script_name];
      
      $('#scripts-content-container .table').append(
        '<a class="file" onclick="autocode.action.loadScript({ script: \'' + script_name + '\'})">'
          + '<span class="icon ' + script_name + '-icon black"></span>'
          + '<span class="info">'
            + '<span class="name">' + script_name + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#scripts-init').hide();
    $('#scripts-content-container').show();
  } else {
    $('#scripts-init').show();
    $('#scripts-content-container').hide();
  }
  
  autocode.action.toggleSection('scripts');
};