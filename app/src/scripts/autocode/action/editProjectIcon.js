autocode.action.editProjectIcon = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project,
    formula: 'formulas/forms/Icon.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Icon',
        content: form.toString(),
        complete: function() {
          var editor = CodeMirror.fromTextArea($('#popup textarea')[0], {
            lineNumbers: true,
            mode: 'xml',
            theme: autocode.editor.getTheme(),
            value: project.icon
          });
          
          autocode.resize.popup();
        }
      });
    },
    submit: function(data) {
      var data = {
        icon: $('#popup .CodeMirror')[0].CodeMirror.getValue()
      };
      
      if (data.icon && data.icon.length) {
        autocode.icon = data.icon;
      } else {
        delete(autocode.icon);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};