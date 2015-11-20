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
        
        var current_generators = autocode.current.generators();
        var generator, generator_icon, generators = [];
        for (var generator_name in current_generators) {
          generator = current_generators[generator_name];
          if (generator_name.split('.').length > 1) {
            generator_icon = 'https://cdn.rawgit.com/crystal/' + generator_name.split('.')[0] + '/master/.autocode/icon.svg';
          } else {
            generator_icon = 'project-icon black';
          }
          if (generator_name.match(new RegExp(value, 'i'))) {
            generators.push({
              action: {
                name: 'addOutputGenerator',
                data: {
                  name: generator_name
                }
              },
              icon: generator_icon,
              text: generator_name
            });
          }
        }
        autocode.fuzzy.open({
          rows: generators,
          target: $('#popup input[name="generator"]'),
          value: value
        });
        
        $('#popup input[name="filename"]').attr('placeholder', current_generators[value] && current_generators[value].filename ? current_generators[value].filename : '');
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
      var current_generators = autocode.current.generators();
      if (!current_generators[data.generator]) {
        autocode.popup.error('Generator does not exist.');
        return false;
      }
      
      // normalize filename
      if (!data.filename) {
        data.filename = current_generators[data.generator].filename;
      }
      
      // validate filename
      var output;
      for (var output_i in autocode.project.outputs) {
        output = autocode.project.outputs[output_i];
        if (
          (output.filename && output.filename == data.filename)
          ||
          (!output.filename && current_generators[output.generator] && current_generators[output.generator].filename == data.filename)
        ) {
          autocode.popup.error('Filename must be unique.');
          return false;
        }
      }
      
      if (data.filename == current_generators[data.generator].filename) {
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
      autocode.action.loadOutput({ output: autocode.project.outputs.length-1 });
      
      autocode.resize.all();
      
      return false;
    }
  });
};