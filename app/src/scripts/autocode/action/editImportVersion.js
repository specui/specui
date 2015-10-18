autocode.action.editImportVersion = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      version: autocode.project.imports[autocode.data.current.import]
    },
    formula: 'formulas/forms/Version.json',
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
      
      if (!data.version || !data.version.length) {
        return autocode.popup.error('Version is required.');
      }
      
      autocode.project.imports[autocode.data.current.import] = data.version;
      
      autocode.popup.close();
      
      autocode.state['imports']({ disableSelected: true });
      autocode.state['imports/module']({ repo: autocode.data.current.import });
      
      return false;
    }
  });
};