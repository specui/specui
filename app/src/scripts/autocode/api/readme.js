autocode.api.readme = {
  uri: 'readme?provider=1',
  init: function(opts) {
    opts.uri = autocode.api.readme.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.readme.init(opts);
    return autocode.api.get(opts);
  }
};