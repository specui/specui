autocode.load = function() {
  autocode.api.auth.get({
    error: function(data) {
      console.log(data);
      alert('Unable to load Autocode. Please contact support.');
    },
    success: function(data) {
      autocode.data.auth = data;
      
      autocode.api.config.get({
        data: {
          repo: 'crystal/autocode'
        },
        error: function(data) {
          console.log(data);
          alert('Unable to load Autocode. Please contact support.');
        },
        success: function(data) {
          autocode.config = jsyaml.safeLoad(data.config);
          
          autocode.api.user.get({
            complete: function() {
              autocode.action.updateRecent();
              
              var repo = autocode.storage.get('repo');
              
              if (!repo) {
                $('#loader').fadeOut(function() {
                  $('#loader').remove();
                  $('#container').show();
                  $('#welcome').hide();
                  autocode.resize.all();
                  $('#container').animate({ opacity: 1 },{
                    complete: function() {
                      $('#welcome').css({ opacity: 0 }).show().animate({ opacity: 1 });
                      autocode.resize.all();
                    }
                  });
                });
                
                return;
              }
              
              $('#loader').fadeOut(function() {
                $('#loader').remove();
                $('#container').show();
                $('#welcome').hide();
                autocode.resize.all();
                $('#container').animate({
                  opacity: 1
                },{
                  complete: function() {
                    $('#app').fadeIn();
                  }
                });
              });
            },
            error: function() {
              $('#new-option, #load-option').hide();
              $('#recent').hide();
            },
            success: function(data) {
              autocode.data.user = data;
              autocode.data.user.isLoggedIn = true;
              
              $('#new-option, #load-option').css('width', '50%');
              $('#login-option').hide();
              
              $('#user .icon').css('background-image', 'url(' + data.avatar + ')');
              $('#user .text').text(data.username);
            }
          });
        }
      });
    }
  });
};