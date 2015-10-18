autocode.action.editURL = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project,
    formula: 'formulas/forms/URL.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project URL',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.url && data.url.length) {
        autocode.project.url = data.url;
      } else {
        delete(autocode.project.url);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};