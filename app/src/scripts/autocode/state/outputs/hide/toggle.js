autocode.state['outputs/hide/toggle'] = function() {
  var checkbox = $('#outputs-content-container .checkbox');
  
  if (checkbox.hasClass('checked')) {
    checkbox.removeClass('checked');
  } else {
    checkbox.addClass('checked');
  }
  
  autocode.state['outputs/hide']();
};