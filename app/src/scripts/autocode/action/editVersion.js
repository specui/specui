autocode.action.editVersion = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project,
    formula: 'formulas/forms/Version.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Version',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.version && data.version.length) {
        autocode.project.version = data.version;
      } else {
        delete(autocode.project.version);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};