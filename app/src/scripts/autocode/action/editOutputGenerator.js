autocode.action.editOutputGenerator = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      generator: autocode.project.outputs[autocode.data.current.output].generator
    },
    formula: 'formulas/forms/Generator.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Output Generator',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.outputs[autocode.data.current.output].generator = data.generator;
      
      autocode.state['outputs']();
      autocode.action.loadOutput();
      
      autocode.popup.close();
      
      return false;
    }
  });
};