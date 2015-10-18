autocode.action.editProjectCopyright = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      copyright: autocode.project.copyright
    },
    formula: 'formulas/forms/Copyright.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Project Copyright',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.copyright && data.copyright.length) {
        autocode.project.copyright = data.copyright;
      } else {
        delete(autocode.project.copyright);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};