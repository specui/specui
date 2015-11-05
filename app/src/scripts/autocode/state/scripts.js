autocode.state['scripts'] = function() {
  if (autocode.project.scripts) {
    $('#scripts-content-container .table a').slice(1).remove();
    
    var output, output_filename;
    for (var output_i in autocode.project.scripts) {
      output = autocode.project.scripts[output_i];
      
      if (autocode.project.scripts instanceof Array) {
        output_name = output.filename;
      } else {
        output_name = output_i;
      }
      
      if (output.filename) {
        output_filename = output.filename;
      } else {
        output_filename = autocode.imports['crystal/' + output.generator.split('.')[0]].exports[output.generator.split('.')[1]].filename;
      }
      
      $('#scripts-content-container .table').append(
        '<a class="file" href="scripts/output?output=' + output_i + '">'
          + '<span class="icon" style="background-image: url(https://cdn.rawgit.com/crystal/' + output.generator.split('.')[0] + '/master/.autocode/icon.svg)"></span>'
          + '<span class="info">'
            + '<span class="name">' + output_filename + '</span>'
            + '<span class="generator">' + output.generator.split('.')[1] + '</span>'
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