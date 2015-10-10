autocode.state['outputs'] = function() {
  if (autocode.project.outputs) {
    $('#outputs-content-container .table a').slice(1).remove();
    
    var outputed;
    for (var output_i in autocode.project.outputs) {
      outputed = autocode.project.outputs[output_i];
      
      if (autocode.project.outputs instanceof Array) {
        output_name = outputed.filename;
      } else {
        output_name = output_i;
      }
      
      $('#outputs-content-container .table').append(
        '<a class="file" href="outputs/output?output=' + output_i + '">'
          + '<span class="icon ' + outputed.type + '-icon"></span>'
          + '<span class="info">'
            + '<span class="name">' + autocode.imports['crystal/' + outputed.generator.split('.')[0]].exports[outputed.generator.split('.')[1]].filename + '</span>'
            + '<span class="generator">' + outputed.generator.split('.')[1] + '</span>'
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