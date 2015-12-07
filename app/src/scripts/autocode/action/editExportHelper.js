autocode.action.editExportHelper = function(opts) {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      alias: opts.alias,
      helper: autocode.project.exports[autocode.data.current.export].helper[opts.alias]
    },
    formula: 'formulas/forms/Helper.json',
    xhr: true,
    ready: function(form) {
      form = $(form.toString());
      form.append('<button class="delete" onclick="autocode.action.removeExportHelper({ alias: \'' + opts.alias + '\' })" type="button">Delete Helper</button>');
      
      autocode.popup.open({
        title: 'Edit Export Helper',
        content: form
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.alias != opts.alias) {
        delete(autocode.project.exports[autocode.data.current.export].helper[opts.alias]);
      }
      autocode.project.exports[autocode.data.current.export].helper[data.alias] = data.helper;
      
      autocode.action.loadExport({ repo: autocode.data.current.export });
      
      autocode.popup.close();
      
      return false;
    }
  });
};