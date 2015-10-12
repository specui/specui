autocode.state['config'] = function() {
  var code_mirror = $('#config-content .CodeMirror');
  var value = jsyaml.safeDump(autocode.project);
  
  autocode.action.toggleSection('config');
  
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#config-content textarea')[0], {
      lineNumbers: true,
      mode: 'yaml'
    });
    
    code_mirror = $('#config-content .CodeMirror')
    code_mirror[0].CodeMirror.setValue(value);
    
    $('.CodeMirror-scroll').scrollTop(2);
    
  } else {
    code_mirror[0].CodeMirror.setValue(value);
  }
};