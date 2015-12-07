autocode.action.editExportFilename = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  var engine = '', filename = '';
  if (typeof(autocode.project.exports[autocode.data.current.export].filename) == 'object') {
    if (autocode.project.exports[autocode.data.current.export].filename.engine) {
      engine = autocode.project.exports[autocode.data.current.export].filename.engine;
    }
    if (autocode.project.exports[autocode.data.current.export].filename.value) {
      filename = autocode.project.exports[autocode.data.current.export].filename.value;
    }
  } else if (typeof(autocode.project.exports[autocode.data.current.export].filename) == 'string') {
    filename = autocode.project.exports[autocode.data.current.export].filename;
  }
  
  new formulator({
    data: {
      engine: engine,
      filename: filename
    },
    formula: 'formulas/forms/Filename.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Export Filename',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].filename = data.filename;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};