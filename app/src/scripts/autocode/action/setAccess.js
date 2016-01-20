autocode.action.setAccess = function(opts) {
  $('#popup input[name="access"]').val(opts.access);
  
  if (opts.access == 'private') {
    $('#popup input[name="access"]').parent().find('button').first().addClass('secondary');
    $('#popup input[name="access"]').parent().find('button').last().removeClass('secondary');
  } else if (opts.access == 'public') {
    $('#popup input[name="access"]').parent().find('button').first().removeClass('secondary');
    $('#popup input[name="access"]').parent().find('button').last().addClass('secondary');
  }
  
  autocode.resize.popup();
};