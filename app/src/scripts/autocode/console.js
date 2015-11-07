autocode.console = {
  init: function() {
    var showConsole = autocode.storage.get('showConsole');
    if (showConsole) {
      $('#console').show();
    } else {
      $('#console').hide();
    }
  }
};