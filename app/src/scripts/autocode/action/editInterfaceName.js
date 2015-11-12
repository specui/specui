autocode.action.editInterfaceName = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: autocode.project.interfaces[autocode.data.current.interface],
    formula: 'formulas/forms/InterfaceName.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Edit Interface Name',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.name && data.name.length) {
        autocode.project.interfaces[autocode.data.current.interface].name = data.name;
      } else {
        delete(autocode.project.interfaces[autocode.data.current.interface].name);
      }
      
      autocode.popup.close();
      
      autocode.state['interfaces']();
      autocode.action.loadInterface();
      
      return false;
    }
  });
};