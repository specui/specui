autocode.action.editImportName = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      name: autocode.data.current.import
    },
    formula: 'formulas/forms/Name.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Import Name',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.name != autocode.data.current.import) {
        autocode.project.imports[data.name] = autocode.object.clone(autocode.project.imports[autocode.data.current.import]);
        delete(autocode.project.imports[autocode.data.current.import]);
      }
      
      autocode.popup.close();
      
      autocode.state['imports']({ disableSelected: true });
      autocode.state['imports/module']({ repo: data.name });
      
      return false;
    }
  });
};