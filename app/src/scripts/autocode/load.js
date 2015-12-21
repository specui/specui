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
            error: function() {
              $('#new-option, #load-option').hide();
              $('#recent').hide();
              
              var user = autocode.storage.get('user');
              if (user && user.avatar) {
                $('#login-option .user-icon').css('background-image', 'url(' + user.avatar + ')');
              } else {
                $('#login-option .user-icon').addClass('guest-icon');
              }
              
              $('#loader').fadeOut(function() {
                $('#loader').remove();
                $('#container').show();
                autocode.resize.all();
                $('#container').animate({ opacity: 1 },{
                  complete: function() {
                    $('.app:last').show();
                    $('#welcome').fadeIn();
                  }
                });
              });
            },
            success: function(user) {
              autocode.api.repos.get({
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
                      $('#menu-project').hide();
                      autocode.resize.all();
                      $('#container').animate({ opacity: 1 },{
                        complete: function() {
                          var config = autocode.query.get('config');
                          if (config) {
                            config = jsyaml.safeLoad(atob(config));
                            autocode.action.loadProject({
                              name: '(Untitled)',
                              config: config
                            });
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
                        
                        if (autocode.state[name]) {
                          autocode.state['tour']();
                          return;
                        }
                        
                        autocode.action.loadProject({
                          name: name,
                          callback: state ? autocode.state[state] : null,
                          confirm: true
                        });
                      }
                    });
                  });
                },
                success: function(projects) {
                  autocode.data.projects = projects;
                  
                  // cache user
                  autocode.storage.set('user', {
                    avatar: user.avatar,
                    username: user.username
                  });
                  
                  autocode.data.accounts = [user];
                  autocode.data.user = data;
                  autocode.data.user.isLoggedIn = true;
                  
                  $('#projects-content-results').empty();
                  
                  $('#project, #release, #status-icon, #target-icon, #usage').hide();
                  $('#add-project').show();
                  
                  $('#welcome').fadeOut();
                  $('header, .app:last').fadeIn();
                  $('#projects-content').addClass('selected');
                  autocode.resize.projects();
                  $('#projects-content-form input').focus();
                  $('#projects-content-form input').trigger('keyup');
                  
                  $('#user .icon').css('background-image', 'url(' + user.avatar + ')');
                  $('#user .text').text(user.username);
                  
                  if (location.hostname.match(/^alpha\./)) {
                    autocode.ws.init();
                    $('#target-icon .text').text(autocode.ws.ip);
                    
                  } else {
                    clearInterval(autocode.data.current.timer);
                    delete(autocode.data.current.timer);
                    
                    var initBox = function() {
                      autocode.api.box.post({
                        error: function(data) {
                          console.log(data);
                          $('#target-icon .text').text('Target not found');
                        },
                        success: function(data) {
                          if (data.ready) {
                            if (!autocode.ws.ip || autocode.ws.ip == '127.0.0.1') {
                              autocode.status.pending();

                              autocode.ws.ip = data.ip;
                              autocode.ws.init();
                            }
                            
                            $('#target-icon .text').text(data.ip);
                          }
                        }
                      });
                    };
                    
                    initBox();
                    
                    autocode.data.current.timer = setInterval(initBox, 10 * 1000);
                  }
                }
              });
            }
          });
        }
      });
    }
  });
};