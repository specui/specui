var autocode = {
  action: {},
  config: {},
  state: {},
  user: {},
  initState: function() {
    $('a').each(function() {
      if ($(this).data('state')) {
        return;
      }
      
      $(this).data('state', true);
      
      $(this).click(autocode.initStateCallback);
    });
  },
  initStateCallback: function(e) {
    var href = $(this).attr('href');
    if (href.match(/^https?:/)) {
      return true;
    }
    
    e.preventDefault();
    
    var action = autocode.state[href];
    if (action) {
      action();
      autocode.initState();
    }
    
    autocode.resize();
    
    return false;
  }
};

$(window).load(autocode.init);
$(window).resize(autocode.resize);