autocode.action.editExportSchema = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      schema: autocode.project.exports[autocode.data.current.export].schema
    },
    formula: 'formulas/forms/Schema.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Schema',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].schema = data.schema;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};