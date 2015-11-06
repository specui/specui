autocode.ws = {
  ip: null,
  io: null,
  init: function() {
    if (!autocode.ws.ip) {
      return;
    }
    autocode.ws.io = io('http://' + autocode.ws.ip + ':12345');
    autocode.ws.io.on('connect', function(socket) {
      console.log('connected');
    });
    autocode.ws.io.on('message', function(data) {
      if (!data.data) {
        return;
      }
      data = data.data.split("\n");
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    });
    autocode.ws.io.on('disconnect', function(data) {
      console.log('disconnected');
    });
  }
};