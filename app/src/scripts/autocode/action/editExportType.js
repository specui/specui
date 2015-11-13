autocode.action.editExportType = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      type: autocode.project.exports[autocode.data.current.export].type
    },
    formula: 'formulas/forms/Type.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Type',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].type = data.type;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};