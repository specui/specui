autocode.status = {
  offline: function() {
    $('#status-icon').removeClass('online pending');
    $('#status-icon').data('hint', 'Offline');
  },
  online: function() {
    $('#status-icon').removeClass('pending').addClass('online');
    $('#status-icon').data('hint', 'Online');
  },
  pending: function() {
    $('#status-icon').removeClass('online').addClass('pending');
    $('#status-icon').data('hint', 'Pending');
  }
};