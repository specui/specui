autocode.unload = {
  callback: function() {
    return 'You will lose any unsaved changes';
  },
  disable: function() {
    $(window).unbind('beforeunload', autocode.unload.callback);
  },
  enable: function() {
    $(window).bind('beforeunload', autocode.unload.callback);
  }
};