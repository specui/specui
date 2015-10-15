autocode.listener = {
  listeners: {},
  add: function(name, state, callback) {
    if (!autocode.listener.listeners[state]) {
      autocode.listener.listeners[state] = {};
    }
    autocode.listener.listeners[state][name] = callback;
  },
  remove: function(name, state) {
    if (state) {
      autocode.listener.listeners[state].splice(
        autocode.listener.listeners[state].indexOf(name),
        1
      );
      if (!Object.keys(autocode.listener.listeners[state]).length) {
        delete(autocode.listener.listeners[state]);
      }
    } else {
      var listeners;
      for (var listener_state in autocode.listener.listeners) {
        delete(autocode.listener.listeners[listener_state][name]);
        if (!Object.keys(autocode.listener.listeners[listener_state]).length) {
          delete(autocode.listener.listeners[listener_state]);
        }
      }
    }
  }
};