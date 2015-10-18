autocode.action.editAuthorName = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      name: autocode.project.author.name
    },
    formula: 'formulas/forms/Name.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Author Name',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.name && data.name.length) {
        if (!autocode.project.author) {
          autocode.project.author = {};
        }
        autocode.project.author.name = data.name;
      } else {
        delete(autocode.project.author.name);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/author']();
      
      return false;
    }
  });
};