autocode.state['outputs/add'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddOutput.json',
    xhr: true,
    ready: function(form) {
      form.fields.filename.autocomplete = false;
      form.fields.generator.autocomplete = false;
      
      form.fields.generator.keyup = function() {
        var value = $('#popup input[name="generator"]').val();
        
        var generator, generators = [];
        for (var generator_name in autocode.data.generators) {
          generator = autocode.data.generators[generator_name];
          if (generator_name.match(new RegExp(value, 'i'))) {
            generators.push({
              icon: 'generator-icon',
              state: 'outputs/add/generator?name=' + generator_name,
              text: generator_name
            });
          }
        }
        autocode.fuzzy.open({
          rows: generators,
          target: $('#popup input[name="generator"]')
        });
      };
      
      autocode.popup.open({
        title: 'Add Output',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (!data.filename) {
        data.filename = autocode.data.generators[data.generator].filename;
      }
      
      // validate filename
      var output;
      for (var output_i in autocode.project.outputs) {
        output = autocode.project.outputs[output_i];
        if (
          (output.filename && output.filename == data.filename)
          ||
          (!output.filename && autocode.data.generators[output.generator].filename == data.filename)
        ) {
          alert('Filename must be unique');
          return false;
        }
      }
      
      if (data.filename == autocode.data.generators[data.generator].filename) {
        delete(data.filename);
      }
      
      autocode.project.outputs.push(data);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['outputs']();
      
      return false;
    }
  });
};