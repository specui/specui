autocode.ws = {
  ip: null,
  io: null,
  init: function() {
    if (!autocode.ws.ip) {
      return;
    }
    
    $('#console .content').append('<div>Connecting...</div>').scrollTop($('#console .content')[0].scrollHeight);
    
    autocode.ws.io = io('http://' + autocode.ws.ip + ':12345');
    autocode.ws.io.on('connect', function(socket) {
      $('#console .content').append('<div>Connected.</div>').scrollTop($('#console .content')[0].scrollHeight);
      autocode.status.online();
    });
    autocode.ws.io.on('message', function(data) {
      if (!data.data) {
        return;
      }
      data = data.data.split("\n");
      for (var i = 0; i < data.length; i++) {
        $('#console .content').append('<div>' + data[i] + '</div>').scrollTop($('#console .content')[0].scrollHeight);
      }
    });
    autocode.ws.io.on('disconnect', function(data) {
      $('#console .content').append('<div>Disconnected.</div>').scrollTop($('#console .content')[0].scrollHeight);
      autocode.status.pending();
    });
  }
};