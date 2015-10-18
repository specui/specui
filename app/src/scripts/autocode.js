jQuery.fn.extend({
  visibleWidth: function() {
    var o = $(this);
    if (o.is(':hidden')) {
      return 0;
    } else {
      return o.outerWidth();
    }
  }
});

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
      
      if (navigator.userAgent.match(/mobile/i)) {
        $(this).bind({
          touchstart: function() {
            $(window).removeData('scrolled');
          },
          touchend: function(e) {
            if ($(window).data('scrolled')) {
              return false;
            }
            return autocode.initStateCallback(e, $(this));
          }
        });
      } else {
        $(this).click(autocode.initStateCallback);
      }
    });
  },
  initStateCallback: function(e, o) {
    var o = o || $(this);
    var href = o.attr('href');
    if (!href) {
      return false;
    } else if (href.match(/^https?:/)) {
      return true;
    }
    
    var query = href.split('?');
    href = query[0];
    query = autocode.query.search(query[1]);
    
    e.preventDefault();
    
    var action = autocode.state[href];
    if (action) {
      $('input:focus').blur();
      action(query);
      history.pushState(null, null, '#' + href);
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