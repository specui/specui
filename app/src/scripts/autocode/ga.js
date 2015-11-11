autocode.ga = {
  send: function(type, href) {
    if (typeof ga !== 'undefined') {
      ga('send', type, href);
    }
  }
};