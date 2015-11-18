autocode.action.outputsToggle = function() {
  var checkbox = $('#outputs-content-container .checkbox');
  
  if (checkbox.hasClass('checked')) {
    checkbox.removeClass('checked');
  } else {
    checkbox.addClass('checked');
  }
  
  autocode.action.outputsHide();
};