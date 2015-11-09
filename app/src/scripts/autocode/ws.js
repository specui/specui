autocode.ws = {
  ip: '127.0.0.1',
  io: null,
  init: function() {
    if (!autocode.ws.ip) {
      return;
    }
    
    $('#console .content').append('<div>Connecting...</div>');
    if (autocode.data.current.pin) {
      $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
    }
    
    autocode.ws.io = io('http://' + autocode.ws.ip + ':12345');
    autocode.ws.io.on('connect', function(socket) {
      $('#console .content').append('<div>Connected.</div>');
      if (autocode.data.current.pin) {
        $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
      }
      autocode.status.online();
      
      $('#usage-on').show();
      $('#usage-off').hide();
    });
    autocode.ws.io.on('error', function(data) {
      alert(data.error);
    });
    autocode.ws.io.on('files', function(data) {
      autocode.data.output = data;
      autocode.state['output']();
    });
    autocode.ws.io.on('message', function(data) {
      if (data.processing === true) {
        autocode.status.processing();
        $('#build-icon, #generate-icon, #run-icon, #update-icon').addClass('disabled');
      } else if (data.processing === false) {
        autocode.status.online();
        $('#build-icon, #generate-icon, #run-icon, #update-icon').removeClass('disabled');
      }
      
      if (data.running === true) {
        autocode.data.current.running = true;
        $('#run-icon').addClass('stop');
      } else if (data.running === false) {
        autocode.data.current.running = false;
        $('#run-icon').removeClass('stop');
      }
      
      if (!data.data) {
        return;
      }
      data = data.data.split("\n");
      for (var i = 0; i < data.length; i++) {
        $('#console .content').append('<div>' + (data[i].length ? data[i] : ' ') + '</div>');
        if (autocode.data.current.pin) {
          $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
        }
      }
    });
    autocode.ws.io.on('disconnect', function(data) {
      $('#console .content').append('<div>Disconnected.</div>');
      if (autocode.data.current.pin) {
        $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
      }
      autocode.status.pending();
      
      $('#usage-on').hide();
      $('#usage-off').show();
    });
  }
};