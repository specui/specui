autocode.api.modules = {
  uri: 'modules',
  init: function(opts) {
    opts.uri = autocode.api.modules.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.modules.init(opts);
    return autocode.api.get(opts);
  }
};