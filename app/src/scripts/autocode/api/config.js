autocode.api.config = {
  uri: 'config?provider=1',
  init: function(opts) {
    opts.uri = autocode.api.config.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.config.init(opts);
    return autocode.api.get(opts);
  },
  post: function(opts) {
    opts = autocode.api.config.init(opts);
    return autocode.api.post(opts);
  }
};