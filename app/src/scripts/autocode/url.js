autocode.url = {
  account: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.account.autocode.run:3003/' + (uri ? uri : '');
    } else {
      return 'https://hub.autocode.run/' + (uri ? uri : '');
    }
  },
  api: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.api.autocode.run:3000/' + (uri ? uri : '');
    } else {
      return 'https://api.autocode.run/' + (uri ? uri : '');
    }
  },
  ws: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'ws://alpha.api.autocode.run:3009/' + (uri ? uri : '');
    } else {
      return 'wss://api.autocode.run:3009/' + (uri ? uri : '');
    }
  }
};