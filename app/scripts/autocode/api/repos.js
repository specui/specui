autocode.api.repos = {
  uri: 'repos',
  init: function(opts) {
    opts.uri = autocode.api.repos.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.repos.init(opts);
    return autocode.api.get(opts);
  }
};