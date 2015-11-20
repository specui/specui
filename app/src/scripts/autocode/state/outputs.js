autocode.state['outputs'] = function() {
  if (autocode.project.outputs) {
    $('#outputs-content-container .table a').slice(1).remove();
    
    var output, output_filename, output_icon;
    for (var output_i in autocode.project.outputs) {
      output = autocode.project.outputs[output_i];
      
      if (autocode.project.outputs instanceof Array) {
        output_name = output.filename;
      } else {
        output_name = output_i;
      }
      
      if (output.filename) {
        output_filename = output.filename;
      } else if (autocode.project.exports && autocode.project.exports[output.generator.split('.')[0]]) {
        output_filename = autocode.project.exports[output.generator.split('.')[0]].filename;
      } else if (autocode.imports[output.generator.split('.')[0]] && autocode.imports[output.generator.split('.')[0]].exports) {
        output_filename = autocode.imports[output.generator.split('.')[0]].exports[output.generator.split('.')[1]].filename;
      } else {
        output_filename = '[ Untitled ]';
      }
      
      if (output.generator.split('.').length > 1) {
        output_icon = '<span class="icon" style="background-image: url(https://cdn.rawgit.com/crystal/' + output.generator.split('.')[0] + '/master/.autocode/icon.svg)"></span>'
      } else {
        output_icon = '<span class="icon project-icon black"></span>';
      }
      
      $('#outputs-content-container .table').append(
        '<a class="file" id="outputs-' + output_i + '" onclick="autocode.action.loadOutput({ output: \'' + output_i + '\' })">'
          + '<span class="image">'
            + output_icon
          + '</span>'
          + '<span class="info">'
            + '<span class="name">' + output_filename + '</span>'
            + '<span class="generator">' + output.generator + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    autocode.initState()
    
    $('#outputs-init').hide();
    $('#outputs-content-container').show();
    
    autocode.action.loadOutput({ output: autocode.data.current.output || autocode.object.firstKey(autocode.project.outputs) });
    
  } else {
    $('#outputs-init').show();
    $('#outputs-content-container').hide();
    
    autocode.resize.outputsInit();
  }
  
  autocode.action.toggleSection('outputs');
};