autocode.api.init = {
  uri: 'init',
  init: function(opts) {
    opts.uri = autocode.api.init.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.init.init(opts);
    return autocode.api.post(opts);
  }
};