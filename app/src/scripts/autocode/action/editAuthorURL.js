autocode.action.editAuthorURL = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      url: autocode.project.author.url
    },
    formula: 'formulas/forms/URL.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Author URL',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.url && data.url.length) {
        if (!autocode.project.author) {
          autocode.project.author = {};
        }
        autocode.project.author.url = data.url;
      } else {
        delete(autocode.project.author.url);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/author']();
      
      return false;
    }
  });
};