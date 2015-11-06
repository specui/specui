autocode.api.build = {
  url: 'http://localhost:12345',
  uri: 'build',
  init: function(opts) {
    opts.uri = autocode.api.build.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.build.init(opts);
    return autocode.api.post(opts);
  }
};