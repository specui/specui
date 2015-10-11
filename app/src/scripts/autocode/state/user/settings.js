autocode.state['user/settings'] = function() {
  autocode.popover.close();
  
  autocode.loader.open({ title: 'Loading Settings...' });
  
  new formulator({
    formula: 'formulas/forms/Settings.json',
    xhr: true,
    ready: function(form) {
      form.action = 'http://alpha.api.crystal.sh:3000/repos';
      form.fields.email.placeholder = autocode.data.user.email;
      form.fields.name.placeholder = autocode.data.user.name;
      form.fields.url.placeholder = autocode.data.user.website;
      form.fields.copyright.placeholder = new Date().getFullYear();
      if (autocode.data.user.company) {
        form.fields.copyright.placeholder += ' ' + autocode.data.user.company;
      } else if (autocode.data.user.name) {
        form.fields.copyright.placeholder += ' ' + autocode.data.user.name;
      }
      
      autocode.popup.open({
        title: 'Settings',
        content: '<div style="padding-bottom: 10px">Note: Defaults to GitHub info.</div>' + form.toString()
      });
    },
    success: function(data) {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
        
        $('#welcome').fadeOut(function() {
          $('#app').fadeIn();
        });
      });
    }
  });
};