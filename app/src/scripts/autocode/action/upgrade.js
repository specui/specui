autocode.action.upgrade = function() {
  // close popover
  autocode.popover.close();
  
  autocode.ws.io.emit('upgrade');
};