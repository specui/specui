autocode.storage = {
  get: function(name, default_item) {
    var item = localStorage.getItem(name);
    if (item && item.match(/^json:\/\//)) {
      item = JSON.parse(item.substr(7));
    }
    return item || default_item;
  },
  remove: function(name, item) {
    return localStorage.removeItem(name);
  },
  set: function(name, item) {
    if (typeof(item) == 'object') {
      item = 'json://' + JSON.stringify(item);
    }
    return localStorage.setItem(name, item);
  }
};