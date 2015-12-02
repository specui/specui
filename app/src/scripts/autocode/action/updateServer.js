autocode.action.upgradeServer = function() {
  // close popover
  autocode.popover.close();
  
  autocode.ws.io.emit('upgrade');
};