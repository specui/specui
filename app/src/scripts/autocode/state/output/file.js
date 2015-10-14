autocode.state['output/file'] = function(opts) {
  var code_mirror = $('#output-content .CodeMirror');
  var value = autocode.data.output.files[opts.file];
  
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#output-content textarea')[0], {
      lineNumbers: true,
      mode: 'javascript'
    });
    
    code_mirror = $('#output-content .CodeMirror')
    code_mirror[0].CodeMirror.setValue(value);
    
    $('.CodeMirror-scroll').scrollTop(2);
    
  } else {
    code_mirror[0].CodeMirror.setValue(value);
  }
};