autocode.api.box = {
  uri: 'box',
  init: function(opts) {
    opts.uri = autocode.api.box.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.box.init(opts);
    return autocode.api.post(opts);
  }
};