autocode.state['config'] = function() {
  autocode.popup.close();
  
  autocode.action.toggleColumn('config-content', 1, { animated: false });
  autocode.action.toggleSection('config');
  
  var code_mirror = $('#config-content .CodeMirror');
  var value = jsyaml.safeDump(autocode.project);
    
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