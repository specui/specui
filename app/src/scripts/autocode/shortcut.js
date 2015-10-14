autocode.shortcut = {
  init: function() {
    $(window).bind('keydown', function(e) {
      if (!e.ctrlKey || !e.shiftKey) {
        return;
      }
      
      switch (e.keyCode) {
        // 1
        case 49: {
          autocode.state['overview']();
          break;
        }
        // 2
        case 50: {
          autocode.state['imports']();
          break;
        }
        // 3
        case 51: {
          autocode.state['config']();
          break;
        }
        // 4
        case 52: {
          autocode.state['output']();
          break;
        }
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
        // w
        case 87: {
          autocode.state['project/close']();
          break;
        }
      }
      
      autocode.resize.all();
      
      return false;
    });
  }
};