autocode.state['config'] = function() {
  autocode.action.toggleSection('config');
  
  if (!$('#config-content .CodeMirror').length) {
    var editor = CodeMirror.fromTextArea($('#config-content textarea')[0], {
      lineNumbers: true,
      mode: 'yaml'
    });
  }
  
  $('#config-content .CodeMirror')[0].CodeMirror.setValue(jsyaml.safeDump(autocode.project));
};