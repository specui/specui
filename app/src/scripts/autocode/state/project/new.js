autocode.state['project/new'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/NewProject.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'New Project',
        content: form.toString()
      });
    }
  });
};