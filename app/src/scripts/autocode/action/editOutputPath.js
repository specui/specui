autocode.action.editOutputPath = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      path: autocode.project.outputs[autocode.data.current.output].path
    },
    formula: 'formulas/forms/Path.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Output Path',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.outputs[autocode.data.current.output].path = data.path;
      
      autocode.state['outputs']();
      autocode.action.loadOutput();
      
      autocode.popup.close();
      
      return false;
    }
  });
};