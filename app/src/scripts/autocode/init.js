autocode.init = function() {
  autocode.initState();
  
  $(window).bind('mousedown', function(e) {
    var target = $(e.target);
    
    if (target.attr('id') != 'popover' && !target.parents('#popover').length) {
      autocode.popover.close();
    }
  });
  
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
          
        },
        success: function(data) {
          autocode.user = data;
          autocode.user.isLoggedIn = true;
          
          $('#user .icon').css('background-image', 'url(' + data.avatar + ')');
          $('#user .text').text(data.username);
        }
      });
      
      var repo = autocode.storage.get('repo');
      
      if (!repo) {
        $('#loader').fadeOut(function() {
          $('#loader').remove();
          $('#container').show();
          autocode.resize();
          $('#container').animate({
            opacity: 1
          },{
            complete: function() {
              $('#welcome').fadeIn();
            }
          });
        });
      }
      
      $('#loader').fadeOut(function() {
        $('#loader').remove();
        $('#container').show();
        $('#welcome').hide();
        autocode.resize();
        $('#container').animate({
          opacity: 1
        },{
          complete: function() {
            $('#app').fadeIn();
          }
        });
      });
      
      return;
      
      autocode.api.repos.get({
        error: function(data) {
          $('#loader').fadeOut(function() {
            $('#loader').remove();
            $('#container').show();
            autocode.resize();
            $('#container').animate({
              opacity: 1
            },{
              complete: function() {
                $('#welcome').fadeIn();
              }
            });
          });
        },
        success: function(data) {
          $('#loader').fadeOut(function() {
            $('#loader').remove();
            $('#container').show();
            $('#welcome').hide();
            autocode.resize();
            $('#container').animate({
              opacity: 1
            },{
              complete: function() {
                $('#app').fadeIn();
              }
            });
          });
        }
      });
    }
  });
  
  autocode.resize();
};

$(window).load(autocode.init);