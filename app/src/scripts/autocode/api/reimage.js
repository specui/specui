autocode.api.reimage = {
  uri: 'reimage',
  init: function(opts) {
    opts.uri = autocode.api.reimage.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.reimage.init(opts);
    return autocode.api.post(opts);
  }
};