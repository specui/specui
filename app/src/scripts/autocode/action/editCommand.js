autocode.action.editCommand = function(opts) {
  opts = opts || {};
  
  autocode.data.current.command = opts.index;
  
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/EditCommand.json',
    xhr: true,
    ready: function(form) {
      form.data = autocode.data.current.commands[opts.index];
      form.fields.command.autocomplete = false;
      
      autocode.popup.open({
        title: 'Edit Command',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (!autocode.project.scripts) {
        autocode.project.scripts = {};
      }
      if (!autocode.project.scripts[autocode.data.current.script]) {
        autocode.project.scripts[autocode.data.current.script] = [];
      }
      
      var script = {
        description: data.description,
        command: data.command
      };
      if (data.path.length) {
        script.path = data.path;
      }
      
      autocode.project.scripts[autocode.data.current.script][autocode.data.current.command] = script;
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.action.loadScript();
      
      return false;
    }
  });
};