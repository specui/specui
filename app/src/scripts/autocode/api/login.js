autocode.api.login = {
  uri: 'login',
  init: function(opts) {
    opts.uri = autocode.api.login.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.login.init(opts);
    return autocode.api.post(opts);
  }
};