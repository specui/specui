autocode.api.generate = {
  uri: 'generate',
  init: function(opts) {
    opts.uri = autocode.api.generate.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.generate.init(opts);
    return autocode.api.post(opts);
  }
};