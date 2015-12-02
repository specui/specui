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
      form.fields.generator.autocomplete = false;
      form.fields.generator.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.generator.keydown = function() {
        if (event.keyCode == 13) {
          $('#fuzzy a').first().click();
        }
      };
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
        title: 'Edit Output Generator',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (!data.generator && !data.generator.length) {
        autocode.popup.error('Generator is required.');
        return false;
      } else if (!autocode.current.generators()[data.generator]) {
        autocode.popup.error('Unknown generator.');
        return false;
      }
      
      if (data.generator && data.generator.length) {
        autocode.project.outputs[autocode.data.current.output].generator = data.generator;
      } else {
        delete(autocode.project.outputs[autocode.data.current.output].generator);
      }
      
      autocode.state['outputs']();
      autocode.action.loadOutput();
      
      autocode.popup.close();
      
      return false;
    }
  });
};