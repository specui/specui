autocode.api.icons = {
  uri: 'icons',
  init: function(opts) {
    opts.uri = autocode.api.icons.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.icons.init(opts);
    return autocode.api.get(opts);
  }
};