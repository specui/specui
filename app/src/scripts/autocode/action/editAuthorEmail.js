autocode.action.editAuthorEmail = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      email: autocode.project.author.email
    },
    formula: 'formulas/forms/Email.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Author Email',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.email && data.email.length) {
        if (!autocode.project.author) {
          autocode.project.author = {};
        }
        autocode.project.author.email = data.email;
      } else {
        delete(autocode.project.author.email);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/author']();
      
      return false;
    }
  });
};