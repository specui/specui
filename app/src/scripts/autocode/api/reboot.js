autocode.api.reboot = {
  uri: 'reboot',
  init: function(opts) {
    opts.uri = autocode.api.reboot.uri;
    return opts;
  },
  post: function(opts) {
    opts = autocode.api.reboot.init(opts);
    return autocode.api.post(opts);
  }
};