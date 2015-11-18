autocode.state['outputs'] = function() {
  if (autocode.project.outputs) {
    $('#outputs-content-container .table a').slice(1).remove();
    
    var output, output_filename;
    for (var output_i in autocode.project.outputs) {
      output = autocode.project.outputs[output_i];
      
      if (autocode.project.outputs instanceof Array) {
        output_name = output.filename;
      } else {
        output_name = output_i;
      }
      
      if (output.filename) {
        output_filename = output.filename;
      } else if (autocode.project.exports[output.generator.split('.')[0]]) {
        output_filename = autocode.project.exports[output.generator.split('.')[0]].filename;
      } else if (autocode.imports[output.generator.split('.')[0]] && autocode.imports[output.generator.split('.')[0]].exports) {
        output_filename = autocode.imports[output.generator.split('.')[0]].exports[output.generator.split('.')[1]].filename;
      } else {
        output_filename = '[ Untitled ]';
      }
      
      $('#outputs-content-container .table').append(
        '<a class="file" onclick="autocode.action.loadOutput({ output: \'' + output_i + '\' })">'
          + '<span class="image">'
            + '<span class="icon" style="background-image: url(https://cdn.rawgit.com/crystal/' + output.generator.split('.')[0] + '/master/.autocode/icon.svg)"></span>'
          + '</span>'
          + '<span class="info">'
            + '<span class="name">' + output_filename + '</span>'
            + '<span class="generator">' + (output.generator.split('.')[1] || output.generator.split('.')[0]) + '</span>'
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
  autocode.action.loadOutput({ output: autocode.data.current.output || autocode.object.firstKey(autocode.project.outputs) });
};