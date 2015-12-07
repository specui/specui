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
      var filename_placeholder = '', engine_placeholder = '';
      if (
        autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator]
        &&
        autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename
      ) {
        if (
          typeof(autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename) == 'object'
          &&
          autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename.value
        ) {
          if (autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename.engine) {
            engine_placeholder = autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename.engine;
          }
          filename_placeholder = autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename.value;
        } else if (typeof(autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename) == 'string') {
          filename_placeholder = autocode.data.generators[autocode.project.outputs[autocode.data.current.output].generator].filename;
        }
      }
      
      form.fields.filename.placeholder = filename_placeholder;
      form.fields.engine.placeholder = engine_placeholder;
      
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