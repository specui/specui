autocode.url = {
  api: function(uri) {
    if (location.host.match(/^alpha/)) {
      return 'http://alpha.api.crystal.sh:3000/' + (uri ? uri : '');
    } else {
      return 'https://api.crystal.sh/' + (uri ? uri : '');
    }
  }
};