autocode.api.logout = {
  uri: 'logout',
  init: function(opts) {
    opts.uri = autocode.api.logout.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.logout.init(opts);
    return autocode.api.get(opts);
  }
};