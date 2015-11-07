autocode.action.togglePin = function() {
  if (autocode.data.current.pin) {
    autocode.data.current.pin = false;
    $('#pin-icon').removeClass('active');
  } else {
    autocode.data.current.pin = true;
    $('#pin-icon').addClass('active');
    $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
  }
};