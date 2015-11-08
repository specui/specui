autocode.status = {
  offline: function() {
    $('#status-icon').removeClass('online pending processing');
    $('#status-icon').data('hint', 'Offline');
    $('#target-icon .target-icon').removeClass('loading');
  },
  online: function() {
    $('#status-icon').removeClass('pending processing').addClass('online');
    $('#status-icon').data('hint', 'Online');
    $('#target-icon .target-icon').removeClass('loading');
  },
  pending: function() {
    $('#status-icon').removeClass('online processing').addClass('pending');
    $('#status-icon').data('hint', 'Pending');
    $('#target-icon .target-icon').addClass('loading');
  },
  processing: function() {
    $('#status-icon').removeClass('online pending').addClass('processing');
    $('#status-icon').data('hint', 'Processing');
    $('#target-icon .target-icon').addClass('loading');
  }
};