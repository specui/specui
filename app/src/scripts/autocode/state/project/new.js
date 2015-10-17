autocode.state['project/new'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/NewProject.json',
    xhr: true,
    ready: function(form) {
      form.action = autocode.url.api('repos');
      autocode.popup.open({
        title: 'New Project',
        content: form.toString()
      });
    },
    success: function(data) {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
        
        autocode.state['project/load/repo']({ name: data.name });
        
        $('#welcome').fadeOut(function() {
          $('.app').fadeIn();
        });
      });
    }
  });
};