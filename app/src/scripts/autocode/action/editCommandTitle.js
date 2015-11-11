autocode.action.editCommandTitle = function(opts) {
  opts = opts || {};
  
  autocode.data.current.command = opts.index;
  
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/EditCommandTitle.json',
    xhr: true,
    ready: function(form) {
      form.data = autocode.data.current.commands[opts.index];
      
      autocode.popup.open({
        title: 'Edit Title',
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
        title: data.title
      };
      
      autocode.project.scripts[autocode.data.current.script][autocode.data.current.command] = script;
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.action.loadScript();
      
      return false;
    }
  });
};