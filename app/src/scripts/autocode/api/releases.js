autocode.api.releases = {
  uri: 'releases',
  init: function(opts) {
    opts.uri = autocode.api.releases.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.releases.init(opts);
    return autocode.api.get(opts);
  }
};