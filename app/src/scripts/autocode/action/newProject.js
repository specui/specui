autocode.action.newProject = function() {
  // close popovers
  autocode.popover.close();
  
  // open popup
  autocode.popup.open({
    title: 'Loading...'
  });
  
  // render form
  new formulator({
    formula: 'formulas/forms/NewProject.json',
    xhr: true,
    ready: function(form) {
      form.action = autocode.url.api('repos');
      
      form.fields.account.autocomplete = false;
      
      form.fields.account.placeholder = autocode.data.accounts[0].username;
      
      form.fields.account.keydown = function(e) {
        if (e.keyCode == 13) {
          var value = $('#popup input[name="account"]').val();
          if ($('#fuzzy a').first().length && value != $('#fuzzy a').first().text()) {
            $('#fuzzy a').first().click();
          } else {
            $('#fuzzy')
          }
          return false;
        }
      };
      form.fields.account.keyup = function(e) {
        if (e.keyCode == 13) {
          autocode.fuzzy.close();
          return false;
        }
        
        var value = $('#popup input[name="account"]').val();
        
        var account, account_data = {}, accounts = [], accounts_other = [];
        for (var account_i in autocode.data.accounts) {
          account = autocode.data.accounts[account_i];
          account_data = {
            action: {
              name: 'addProjectAccount',
              data: {
                name: account.username
              }
            },
            icon: 'login-icon',
            text: account.username
          };
          if (account.username.match(new RegExp(value, 'i'))) {
            accounts.push(account_data);
          } else {
            accounts_other.push(account_data);
          }
        }
        
        accounts = accounts.concat(accounts_other);
        
        autocode.fuzzy.open({
          rows: accounts,
          target: $('#popup input[name="account"]'),
          value: value
        });
      };
      
      form = form.toObject();
      
      var access_field = form.find('.field').eq(2);
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
      
      autocode.popup.open({
        title: 'New Project',
        content: form
      });
    },
    submit: function(data) {
      if (!data.account) {
        data.account = autocode.data.accounts[0].username;
      }
      
      $('#popup .error').hide();
      $('#popup .buttons button').attr('disabled', true).text('Loading...');
      
      autocode.resize.popup();
    },
    error: function(data) {
      $('#popup .buttons button').attr('disabled', false).text('Create Project');
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
      });
    }
  });
};