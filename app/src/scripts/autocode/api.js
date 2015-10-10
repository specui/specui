autocode.api = {
  url: 'http://alpha.api.crystal.sh:3000',
  ajax: function(opts) {
    opts.url = autocode.api.url + '/' + opts.uri;
    
    $.ajax({
      method: opts.method,
      url: opts.url,
      error: opts.error,
      success: opts.success,
      xhrFields: {
        withCredentials: true
      }
    });
  },
  get: function(opts) {
    opts.method = 'get';
    return autocode.api.ajax(opts);
  }
};