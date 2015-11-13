autocode.action.addInterface = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddInterface.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Add Interface',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      var interface_data = {
        name: data.name,
        port: data.port
      };
      
      if (!autocode.project.interfaces) {
        autocode.project.interfaces = [];
      }
      autocode.project.interfaces.push(interface_data);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['interfaces']();
      
      return false;
    }
  });
};