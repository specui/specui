autocode.action.halt = function() {
  // close popover
  autocode.popover.close();
  
  // halt process
  autocode.ws.io.emit('halt');
};