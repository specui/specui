autocode.state['outputs/add'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddOutput.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Add Output',
        content: form.toString()
      });
    },
    submit: function() {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      return false;
    }
  });
};