autocode.action.updateServer = function() {
  // close popover
  autocode.popover.close();
  
  autocode.ws.io.emit('upgrade');
};