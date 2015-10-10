autocode.storage = {
  get: function(name) {
    return localStorage.getItem(name);
  },
  set: function(name) {
    return localStorage.setItem(name, item);
  }
};