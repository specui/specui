autocode.state['outputs'] = function() {
  if (autocode.project.outputs) {
    $('#outputs-content-container .table a').slice(1).remove();
    
    var outputed;
    for (var output_name in autocode.project.outputs) {
      outputed = autocode.project.outputs[output_name];
      
      $('#outputs-content-container .table').append(
        '<a class="file" href="outputs/output?output=' + output_name + '">'
          + '<span class="icon ' + outputed.type + '-icon"></span>'
          + '<span class="info">'
            + '<span class="name">' + output_name + '</span>'
            + '<span class="generator">' + outputed.type + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#outputs-init').hide();
    $('#outputs-content-container').show();
  } else {
    $('#outputs-init').show();
    $('#outputs-content-container').hide();
  }
  
  autocode.action.toggleSection('outputs');
};