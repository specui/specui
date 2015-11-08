autocode.status = {
  seconds: 0,
  timer: null,
  offline: function() {
    $('#status-icon').removeClass('online pending processing');
    $('#status-icon').data('hint', 'Offline');
    $('#target-icon .target-icon').removeClass('loading');
    
    autocode.status.startTimer();
  },
  online: function() {
    $('#status-icon').removeClass('pending processing').addClass('online');
    $('#status-icon').data('hint', 'Online');
    $('#target-icon .target-icon').removeClass('loading');
    
    autocode.status.startTimer();
  },
  pending: function() {
    $('#status-icon').removeClass('online processing').addClass('pending');
    $('#status-icon').data('hint', 'Pending');
    $('#target-icon .target-icon').addClass('loading');
    
    autocode.status.startTimer();
  },
  processing: function() {
    $('#status-icon').removeClass('online pending').addClass('processing');
    $('#status-icon').data('hint', 'Processing');
    $('#target-icon .target-icon').addClass('loading');
    
    autocode.status.startTimer();
  },
  clearTimer: function() {
    if (autocode.status.timer) {
      clearInterval(autocode.status.timer);
      delete(autocode.status.timer);
    }
    
    autocode.status.seconds = 0;
  },
  startTimer: function() {
    autocode.status.clearTimer();
    autocode.status.timer = setInterval(autocode.status.updateTimer, 1000);
  },
  updateTimer: function() {
    autocode.status.seconds++;
    if ($('#hint').is(':visible') && $('#hint').data('target') && $('#hint').data('target').attr('id') == 'status-icon') {
      $('#hint').text($('#status-icon').data('hint') + ' (' + autocode.status.seconds + ')');
    }
  }
};