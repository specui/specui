autocode.ga = {
  send: function() {
    if (typeof ga !== 'undefined') {
      ga('send', 'pageview', href);
    }
  }
};