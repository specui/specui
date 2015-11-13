autocode.action.editExportName = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      name: autocode.data.current.export
    },
    formula: 'formulas/forms/Name.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Name',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.name != autocode.data.current.export) {
        autocode.project.exports[data.name] = autocode.object.clone(autocode.project.exports[autocode.data.current.export]);
        delete(autocode.project.exports[autocode.data.current.export]);
      }
      
      autocode.data.current.export = data.name;
      
      autocode.state['exports']();
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};