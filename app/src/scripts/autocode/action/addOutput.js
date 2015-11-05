autocode.action.addOutput = function() {
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
              icon: 'https://cdn.rawgit.com/crystal/' + generator_name.split('.')[0] + '/master/.autocode/icon.svg',
              state: 'outputs/add/generator?name=' + generator_name,
              text: generator_name
            });
          }
        }
        autocode.fuzzy.open({
          rows: generators,
          target: $('#popup input[name="generator"]'),
          value: value
        });
        
        $('#popup input[name="filename"]').attr('placeholder', autocode.data.generators[value] && autocode.data.generators[value].filename ? autocode.data.generators[value].filename : '');
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
      
      // validate generator
      if (!autocode.data.generators[data.generator]) {
        autocode.popup.error('Generator does not exist.');
        return false;
      }
      
      // normalize filename
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
          autocode.popup.error('Filename must be unique.');
          return false;
        }
      }
      
      if (data.filename == autocode.data.generators[data.generator].filename) {
        delete(data.filename);
      }
      
      if (!autocode.project.outputs) {
        autocode.project.outputs = [];
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