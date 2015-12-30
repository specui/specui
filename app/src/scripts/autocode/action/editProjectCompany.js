autocode.action.editProjectCompany = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      company: autocode.project.company
    },
    formula: 'formulas/forms/Company.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Company',
        content: form.toObject()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.company && data.company.length) {
        autocode.project.company = data.company;
      } else {
        delete(autocode.project.company);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};