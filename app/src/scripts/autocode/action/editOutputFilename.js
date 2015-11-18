autocode.action.editOutputFilename = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      filename: autocode.project.outputs[autocode.data.current.output].filename
    },
    formula: 'formulas/forms/Filename.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Output Filename',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.outputs[autocode.data.current.output].filename = data.filename;
      
      autocode.state['outputs']();
      autocode.action.loadOutput();
      
      autocode.popup.close();
      
      return false;
    }
  });
};