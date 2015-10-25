autocode.api = {
  url: null,
  ajax: function(opts) {
    opts.url = autocode.api.url + opts.uri;
    
    var ajax = {
      contentType: 'application/json',
      dataType: 'json',
      method: opts.method,
      url: opts.url,
      complete: opts.complete,
      error: function(data) {
        if (opts.error) {
          opts.error(data.responseJSON);
        }
      },
      success: opts.success,
      xhrFields: {
        withCredentials: true
      }
    };
    
    if (opts.data) {
      if (opts.method == 'get') {
        for (var name in opts.data) {
          if (ajax.url.match(/\?/)) {
            ajax.url += '&';
          } else {
            ajax.url += '?';
          }
          ajax.url += name + '=' + opts.data[name];
        }
      } else {
        ajax.data = JSON.stringify(opts.data);
      }
    }
    
    $.ajax(ajax);
  },
  get: function(opts) {
    opts.method = 'get';
    return autocode.api.ajax(opts);
  },
  post: function(opts) {
    opts.method = 'post';
    return autocode.api.ajax(opts);
  }
};