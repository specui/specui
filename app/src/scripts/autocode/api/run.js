autocode.api.run = {
  uri: 'run',
  init: function(opts) {
    opts.uri = autocode.api.run.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.run.init(opts);
    return autocode.api.post(opts);
  }
};