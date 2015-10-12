autocode.shortcut = {
  init: function() {
    $(window).bind('keydown', function(e) {
      if (!e.ctrlKey) {
        return;
      }
      
      switch (e.keyCode) {
        // s
        case 83: {
          autocode.state['project/save']();
          break;
        }
      }
      
      autocode.resize.overlay();
      autocode.resize.popup();
    });
  }
};