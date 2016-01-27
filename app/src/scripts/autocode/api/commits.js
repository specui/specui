autocode.api.commits = {
  uri: 'commits',
  init: function(opts) {
    opts.uri = autocode.api.commits.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.commits.init(opts);
    return autocode.api.get(opts);
  }
};