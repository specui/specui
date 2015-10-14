autocode.init = function() {
  autocode.resize.loader();
  $('#loader').animate({ opacity: 1 });
  
  autocode.hint.init()
  autocode.shortcut.init()
  autocode.initState();
  
  $(window).bind({
    keyup: function(e) {
      if (e.keyCode == 9 || e.keyCode == 27) {
        autocode.fuzzy.close();
      }
    },
    mousedown: function(e) {
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
    }
  });
  
  $('#content .content-center').bind('scroll', function() {
    if ($('#fuzzy').length) {
      autocode.resize.fuzzy();
    }
  });
  
  var code = autocode.query.get('code');
  if (code) {
    history.pushState(null, null, '/');
    autocode.api.login.post({
      data: {
        code: code,
        provider: 1
      },
      error: function(data) {
        alert('Unable to login.');
        autocode.load();
      },
      success: autocode.load
    });
  } else {
    autocode.load();
  }
  
  autocode.resize.all();
};

$(window).load(autocode.init);