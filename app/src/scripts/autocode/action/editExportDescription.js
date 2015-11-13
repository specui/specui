autocode.action.editExportDescription = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      description: autocode.project.exports[autocode.data.current.export].description
    },
    formula: 'formulas/forms/Description.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Description',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].description = data.description;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};