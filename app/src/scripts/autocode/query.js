autocode.query = {
  get: function(variable, search) {
    var query = search ? search : window.location.search.substring(1);
    var vars = query.split('&');
    var data = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (variable && decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  },
  search: function(search) {
    var query = search ? search : window.location.search.substring(1);
    var vars = query.split('&');
    var data = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return data;
  }
};