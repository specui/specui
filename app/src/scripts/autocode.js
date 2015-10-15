var autocode = {
  action: {},
  config: {},
  data: {
    current: {}
  },
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
    
    var query = href.split('?');
    href = query[0];
    query = autocode.query.search(query[1]);
    
    e.preventDefault();
    
    var action = autocode.state[href];
    if (action) {
      action(query);
      autocode.initState();
    }
    
    if (autocode.listener.listeners[href]) {
      for (var listener_name in autocode.listener.listeners[href]) {
        autocode.listener.listeners[href][listener_name](query);
      }
    }
    
    autocode.resize.all();
    
    return false;
  }
};

$(window).load(autocode.init);
$(window).resize(autocode.resize);