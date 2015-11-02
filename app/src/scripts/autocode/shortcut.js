autocode.shortcut = {
  init: function() {
    $(window).bind('keydown', function(e) {
      if (e.keyCode == 27) {
        if ($('#popup').length) {
          autocode.action.closePopup();
        } else {
          autocode.action.closeProject();
        }
        return;
      } else if (!e.ctrlKey || !e.shiftKey) {
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
        // b
        case 66: {
          autocode.action.build();
          break;
        }
        // n
        case 78: {
          autocode.action.newProject();
          break;
        }
        // o
        case 79: {
          autocode.action.loadProject();
          break;
        }
        // r
        case 82: {
          autocode.action.run();
          break;
        }
        // s
        case 83: {
          autocode.action.saveProject();
          break;
        }
        // w
        case 87: {
          autocode.action.closeProject();
          break;
        }
      }
      
      autocode.resize.all();
      
      return false;
    });
  }
};