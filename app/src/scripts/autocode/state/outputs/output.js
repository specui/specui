autocode.state['outputs/output'] = function(opts) {
  var outputed = autocode.project.outputs[opts.output];
  var generator = autocode.imports['crystal/' + outputed.generator.split('.')[0]].exports[outputed.generator.split('.')[1]];
  
  $('#outputs-content input[name="filename"]').attr('placeholder', generator.filename);
  $('#outputs-content input[name="filename"]').val(outputed.filename);
  $('#outputs-content input[name="generator"]').val(outputed.generator);
  
  $('#outputs-content textarea').val(jsyaml.safeDump(outputed.spec));
};