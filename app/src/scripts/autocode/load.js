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
                repo = location.pathname.substr(1);
              }
              
              if (!repo) {
                $('#loader').fadeOut(function() {
                  $('#loader').remove();
                  $('#container').show();
                  $('#build-icon, #run-icon, #welcome').hide();
                  autocode.resize.all();
                  $('#container').animate({ opacity: 1 },{
                    complete: function() {
                      var config = jsyaml.safeLoad(atob(autocode.query.get('config')));
                      if (config) {
                        autocode.action.loadProject({
                          name: '(Untitled)',
                          config: config
                        });
                      } else {
                        $('#welcome').css({ opacity: 0 }).show().animate({ opacity: 1 });
                      }
                      
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
                    var name = repo.split('/').splice(0, 2).join('/');
                    var state = repo.split('/').splice(2).join('/');
                    
                    autocode.action.loadProject({
                      name: name,
                      callback: state ? autocode.state[state] : null
                    });
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