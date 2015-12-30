autocode.state['overview/icon'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  autocode.action.toggleSection('overview', 'icon');
  
  if (autocode.icon) {
    $('#overview-icon-content img').removeClass('login-icon').attr('src', 'data:image/svg+xml;base64,' + btoa(autocode.icon));
  } else {
    $('#overview-icon-content img').addClass('login-icon').attr('src', 'data:image/svg+xml;base64,');
  }
  
  var code_mirror = $('#overview-icon-content .CodeMirror');
  var value = autocode.icon || '';
    
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#overview-icon-content textarea')[0], {
      lineNumbers: autocode.editor.lineNumbersEnabled(),
      mode: 'xml',
      theme: autocode.editor.getTheme(),
      value: value
    });
    
    editor.on('change', function() {
      var value = $('#overview-icon-content .CodeMirror')[0].CodeMirror.getValue();
      $('#overview-icon-content img').removeClass('login-icon').attr('src', 'data:image/svg+xml;base64,' + btoa(value));
    });
    
    code_mirror = $('#overview-icon-content .CodeMirror');
  }
  
  code_mirror[0].CodeMirror.setValue(value);
  
  setTimeout(function() { $('#overview-icon-content .CodeMirror')[0].CodeMirror.refresh() }, 0);
  
  autocode.resize.all();
};