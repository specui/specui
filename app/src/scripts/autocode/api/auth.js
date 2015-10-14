autocode.api.auth = {
  uri: 'auth',
  init: function(opts) {
    opts.uri = autocode.api.auth.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.auth.init(opts);
    return autocode.api.get(opts);
  }
};