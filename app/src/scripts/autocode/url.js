autocode.url = {
  account: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.account.autocode.run:3003/' + (uri ? uri : '');
    } else {
      return 'https://account.autocode.run/' + (uri ? uri : '');
    }
  },
  api: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.api.autocode.run:3000/' + (uri ? uri : '');
    } else {
      return 'https://api.autocode.run/' + (uri ? uri : '');
    }
  }
};