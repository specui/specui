autocode.api.user = {
  uri: 'user',
  init: function(opts) {
    opts.uri = autocode.api.user.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.user.init(opts);
    return autocode.api.get(opts);
  }
};