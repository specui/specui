autocode.ws = {
  io: null,
  ip: null,
  init: function() {
    if (!autocode.ws.ip) {
      return;
    }
    
    $('#console .content').append('<div>Connecting...</div>');
    if (autocode.data.current.pin) {
      $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
    }
    
    var url = autocode.url.ws() + '?ip=' + autocode.ws.ip;
    
    autocode.ws.io = io(url);
    
    autocode.ws.io.on('started', function(socket) {
      $('#console .content').append('<div>Connected.</div>');
      if (autocode.data.current.pin) {
        $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
      }
      autocode.status.online();
      
      $('#usage-on').show();
      $('#usage-off').hide();
      
      autocode.ws.io.emit('icon', {
        project: autocode.repo.split('/')[1],
        user: autocode.repo.split('/')[0]
      });
    });
    
    autocode.ws.io.on('stopped', function(data) {
      $('#console .content').append('<div>Disconnected.</div>');
      if (autocode.data.current.pin) {
        $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
      }
      autocode.status.pending();
      
      $('#usage-on').hide();
      $('#usage-off').show();
    });
    
    autocode.ws.io.on('commit', function(data) {
      var config = autocode.storage.get('config');
      if (!config || typeof(config) != 'object') {
        config = {};
      }
      delete(config[autocode.repo]);
      autocode.storage.set('config', config);
      autocode.data.originalConfig = jsyaml.safeDump(autocode.project);
      autocode.popup.close();
    });
    autocode.ws.io.on('contents', function(data) {
      autocode.action.loadFile({
        file: data.file,
        value: data.contents
      });
    });
    autocode.ws.io.on('error', function(data) {
      alert(data.error);
    });
    autocode.ws.io.on('files', function(data) {
      autocode.data.output = data;
      if (autocode.data.current.tab == 'output') {
        autocode.state['output']();
      }
    });
    autocode.ws.io.on('icon', function(data) {
      autocode.icon = data.contents;
      $('#project .icon').css('background-image', 'url(data:image/svg+xml;base64,' + btoa(data.contents) + ')');
    });
    autocode.ws.io.on('message', function(data) {
      console.log(data);
      
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
        $('#console .content').append('<div>' + (data[i].length ? data[i] : '&nbsp;') + '</div>');
        if (autocode.data.current.pin) {
          $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
        }
      }
    });
  }
};