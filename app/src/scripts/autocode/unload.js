autocode.unload = {
  callback: function() {
    return 'You will lose any unsaved changes';
  },
  disable: function() {
    if (location.hostname.match(/^alpha/)) {
      return;
    }
    $(window).unbind('beforeunload', autocode.unload.callback);
  },
  enable: function() {
    if (location.hostname.match(/^alpha/)) {
      return;
    }
    $(window).bind('beforeunload', autocode.unload.callback);
  }
};