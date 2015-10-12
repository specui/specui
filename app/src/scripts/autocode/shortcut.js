autocode.shortcut = {
  init: function() {
    $(window).bind('keydown', function(e) {
      if (!e.ctrlKey || !e.shiftKey) {
        return;
      }
      
      switch (e.keyCode) {
        // n
        case 78: {
          autocode.state['project/new']();
          break;
        }
        // o
        case 79: {
          autocode.state['project/load']();
          break;
        }
        // s
        case 83: {
          autocode.state['project/save']();
          break;
        }
      }
      
      autocode.resize.overlay();
      autocode.resize.popup();
      
      return false;
    });
  }
};