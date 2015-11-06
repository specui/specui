autocode.action.addCommand = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddCommand.json',
    xhr: true,
    ready: function(form) {
      form.fields.command.autocomplete = false;
      
      form.fields.command.keyup = function() {
        var rows = [], command_name, commands = ['build','run','stop'];
        for (var i in commands) {
          command_name = commands[i];
          if (command_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'addCommandName',
                data: { name: command_name }
              },
              icon: command_name + '-icon black',
              text: command_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="command"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Add Command',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.scripts.build.push({
        command: data.command,
        description: data.description,
        title: data.title
      });
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['commands']();
      
      return false;
    }
  });
};