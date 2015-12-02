autocode.action.setAccess = function(opts) {
  $('#popup input[name="access"]').val(opts.access);
  
  if (opts.access == 'private') {
    if (autocode.data.user.innovator !== true) {
      $('#popup .access-warning').show();
      $('#popup button').last().attr('disabled', true);
    }
    $('#popup input[name="access"]').parent().find('button').first().addClass('secondary');
    $('#popup input[name="access"]').parent().find('button').last().removeClass('secondary');
  } else if (opts.access == 'public') {
    if (autocode.data.user.innovator !== true) {
      $('#popup .access-warning').hide();
      $('#popup button').last().attr('disabled', false);
    }
    $('#popup input[name="access"]').parent().find('button').first().removeClass('secondary');
    $('#popup input[name="access"]').parent().find('button').last().addClass('secondary');
  }
  
  autocode.resize.popup();
};