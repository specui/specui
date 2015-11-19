autocode.string = {
  capitalize: function(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },
  escape: function(str) {
    return str.replace(/"/g, '&quot;');
  }
};