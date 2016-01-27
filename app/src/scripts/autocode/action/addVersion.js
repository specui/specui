autocode.action.addVersion = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddVersion.json',
    xhr: true,
    ready: function(form) {
      autocode.popup.open({
        title: 'Add Version',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      var version_data = {
        name: data.name,
        port: data.port
      };
      
      if (!autocode.project.versions) {
        autocode.project.versions = [];
      }
      autocode.project.versions.push(version_data);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['versions']();
      
      return false;
    }
  });
};