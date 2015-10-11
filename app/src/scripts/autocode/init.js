autocode.init = function() {
  autocode.hint.init()
  autocode.initState();
  
  $(window).bind('mousedown', function(e) {
    var target = $(e.target);
    
    if (
      target.attr('id') != 'popover' && !target.parents('#popover').length
      && target.attr('id') != 'menu' && !target.parents('#menu').length
      && target.attr('id') != 'user' && !target.parents('#user').length
    ) {
      autocode.popover.close();
    }
    
    if (target.attr('id') != 'fuzzy' && !target.parents('#fuzzy').length) {
      autocode.fuzzy.close();
    }
  });
  
  autocode.action.updateRecent();
  
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
          autocode.data.user = data;
          autocode.data.user.isLoggedIn = true;
          
          $('#user .icon').css('background-image', 'url(' + data.avatar + ')');
          $('#user .text').text(data.username);
        }
      });
      
      var repo = autocode.storage.get('repo');
      
      if (!repo) {
        $('#loader').fadeOut(function() {
          $('#loader').remove();
          $('#container').show();
          $('#welcome').hide();
          autocode.resize();
          $('#container').animate({ opacity: 1 },{
            complete: function() {
              $('#welcome').css({ opacity: 0 }).show().animate({ opacity: 1 });
              autocode.resize();
            }
          });
        });
        
        return;
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
    }
  });
  
  autocode.resize();
};

$(window).load(autocode.init);