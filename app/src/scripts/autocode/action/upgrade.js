autocode.action.upgrade = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/Upgrade.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Upgrade',
        content: form.toString()
      });
    },
    success: function(data) {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
        
        autocode.action.loadProject({ name: data.name });
        
        $('#welcome').fadeOut(function() {
          $('.app').fadeIn();
        });
      });
    }
  });
};