autocode.action.addCommandTitle = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddCommandTitle.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Add Title',
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
      
      autocode.project.scripts[autocode.data.current.script].push(script);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.action.loadScript();
      
      return false;
    }
  });
};