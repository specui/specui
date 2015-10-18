autocode.action.editDescription = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project,
    formula: 'formulas/forms/Description.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Description',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.description && data.description.length) {
        autocode.project.description = data.description;
      } else {
        delete(autocode.project.description);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};