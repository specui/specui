autocode.action.editExportFormat = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      format: autocode.project.exports[autocode.data.current.export].format
    },
    formula: 'formulas/forms/Format.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Format',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].format = data.format;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};