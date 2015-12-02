autocode.action.access = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/Access.json',
    xhr: true,
    ready: function(form) {
      form.action = autocode.url.api('access');
      form.data.repo = autocode.repo;
      
      autocode.popup.open({
        title: 'Change Project Access',
        content: form.toString()
      });
      
      var access_field = $('#popup .field').eq(0);
      access_field.find('input').attr('type', 'hidden');
      access_field.append('<button class="button-icon project-icon" onclick="autocode.action.setAccess({ access: \'public\' })" type="button">Public</button> <button class="secondary private-icon button-icon" onclick="autocode.action.setAccess({ access: \'private\' })" type="button">Private</button><div class="access-warning" style="background-color: #eef8ff; border-radius: 5px; display: none; font-size: 12px; margin-top: 5px; padding: 5px">Upgrade to an <a onclick="autocode.action.upgrade()">Innovator Account</a> to create private projects.</div>');
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