autocode.url = {
  api: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.api.autocode.run:3000/' + (uri ? uri : '');
    } else {
      return 'https://api.autocode.run/' + (uri ? uri : '');
    }
  }
};