autocode.action.editName = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project,
    formula: 'formulas/forms/Name.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Name',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.name && data.name.length) {
        autocode.project.name = data.name;
      } else {
        delete(autocode.project.name);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};