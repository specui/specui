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
        // c
        case 67: {
          autocode.action.toggleConsole();
          break;
        }
        // g
        case 71: {
          autocode.action.generate();
          break;
        }
        // h
        case 72: {
          autocode.action.halt();
          break;
        }
        // l
        case 76: {
          autocode.action.clean();
          break;
        }
        // m
        case 77: {
          autocode.action.commitProject();
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
        // t
        case 84: {
          autocode.action.reset();
          break;
        }
        // u
        case 85: {
          autocode.action.update();
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