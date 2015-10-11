autocode.loader = {
  close: function(opts) {
    autocode.popup.close();
  },
  open: function(opts) {
    opts = opts || {};
    
    var title = opts.title || 'Loading...';
    
    autocode.popup.open({ title: title });
  }
};