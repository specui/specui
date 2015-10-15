autocode.state.push = function(state, opts) {
  if (!autocode.state[state]) {
    return;
  }
  
  autocode.state[state](opts);
  
  if (autocode.listener.listeners[state]) {
    for (var listener_name in autocode.listener.listeners[state]) {
      autocode.listener.listeners[state][listener_name](opts);
    }
  }
};