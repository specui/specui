autocode.action.editInterfacePort = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project.interfaces[autocode.data.current.interface],
    formula: 'formulas/forms/InterfacePort.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Interface Port',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.port && data.port.length) {
        autocode.project.interfaces[autocode.data.current.interface].port = data.port;
      } else {
        delete(autocode.project.interfaces[autocode.data.current.interface].port);
      }
      
      autocode.popup.close();
      
      autocode.state['interfaces']();
      autocode.action.loadInterface();
      
      return false;
    }
  });
};