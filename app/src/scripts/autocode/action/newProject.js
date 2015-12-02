autocode.action.newProject = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/NewProject.json',
    xhr: true,
    ready: function(form) {
      form.action = autocode.url.api('repos');
      form = $(form.toString());
      
      /*
      var access_field = form.find('.field').eq(1);
      access_field.find('input').attr('type', 'hidden');
      access_field.find('input').val('public');
      
      var public_button = $(document.createElement('button'));
      public_button.addClass('button-icon project-icon');
      public_button.attr('type', 'button');
      public_button.on('click', function() {
        autocode.action.setAccess({ access: 'public' })
      });
      public_button.text('Public');
      access_field.append(public_button);
      
      var private_button = $(document.createElement('button'));
      private_button.addClass('button-icon private-icon secondary');
      private_button.attr('type', 'button');
      private_button.on('click', function() {
        autocode.action.setAccess({ access: 'private' })
      });
      private_button.text('Private');
      access_field.append(private_button);
      
      var warning = $(document.createElement('div'));
      warning.addClass('access-warning');
      warning.css({
        backgroundColor: '#eef8ff',
        borderRadius: '5px',
        display: 'none',
        fontSize: '12px',
        marginTop: '5px',
        padding: '5px'
      });
      warning.html('Upgrade to an <a href="' + autocode.url.account() + '" target="_blank">Innovator Account</a> to create private projects.');
      access_field.append(warning);
      */
      
      autocode.popup.open({
        title: 'New Project',
        content: form
      });
    },
    submit: function() {
      $('#popup button').attr('disabled', true).text('Loading...');
    },
    error: function(data) {
      $('#popup button').attr('disabled', false).text('Create Project');
      $('#popup .error').text(data.error).show();
      
      autocode.resize.popup();
    },
    success: function(data) {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
        
        autocode.action.loadProject({
          confirm: true,
          name: data.name
        });
        
        $('#welcome').fadeOut(function() {
          $('.app').fadeIn();
        });
      });
    }
  });
};