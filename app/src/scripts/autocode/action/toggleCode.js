autocode.action.toggleCode = function(tab) {
  $('#code-tabs a').removeClass('selected');
  $('#code-tabs-' + tab).addClass('selected');
  
  switch (tab) {
    case 'code': {
      $('#code-preview').hide();
      $('#code-editor').show();
      
      autocode.ws.io.emit('contents', {
        config: jsyaml.safeDump(autocode.project),
        project: autocode.repo.split('/')[1],
        user: autocode.repo.split('/')[0],
        file: autocode.data.current.file
      });
      
      break;
    }
    case 'spec': {
      $('#code-preview').hide();
      $('#code-editor').show();
      
      var code_mirror = $('#output-content .CodeMirror');
      var mod, exp, filename;
      var value = '';
      if (autocode.project.outputs) {
        for (var i = 0; i < autocode.project.outputs.length; i++) {
          if (autocode.project.outputs[i].filename) {
            filename = autocode.project.outputs[i].filename;
          } else if (autocode.project.outputs[i].generator) {
            mod = autocode.project.outputs[i].generator.split('.')[0];
            exp = autocode.project.outputs[i].generator.split('.')[1];
            if (!autocode.imports[mod] || !autocode.imports[mod].exports || !autocode.imports[mod].exports[exp]) {
              continue;
            }
            filename = autocode.imports[mod].exports[exp].filename;
          } else {
            continue;
          }
          if (filename == autocode.data.current.file) {
            autocode.data.current.output = i;
            value = jsyaml.safeDump(autocode.project.outputs[i].spec);
          }
        }
      }
      
      if (!code_mirror.length) {
        var editor = CodeMirror.fromTextArea($('#output-content textarea')[0], {
          lineNumbers: autocode.editor.lineNumbersEnabled(),
          mode: 'yaml',
          theme: autocode.editor.getTheme()
        });
        
        code_mirror = $('#output-content .CodeMirror')
        code_mirror[0].CodeMirror.setValue(value);
        
        $('.CodeMirror-scroll').scrollTop(2);
        
      } else {
        code_mirror[0].CodeMirror.setOption('mode', 'yaml');
        code_mirror[0].CodeMirror.setValue(value);
      }
      
      break;
    }
    case 'preview': {
      $('#code-editor').hide();
      $('#code-preview').show();
      
      autocode.ws.io.emit('contents', {
        config: jsyaml.safeDump(autocode.project),
        project: autocode.repo.split('/')[1],
        user: autocode.repo.split('/')[0],
        file: autocode.data.current.file
      });
      
      break;
    }
  }
};