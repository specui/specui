autocode.action.outputsHide = function() {
  var checkbox = $('#outputs-content-container .checkbox');
  
  if (checkbox.hasClass('checked')) {
    $('#outputs-content-container .schema .field').each(function() {
      var input = $(this).find('input');
      if (input.val().length) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  } else {
    $('#outputs-content-container .schema .field').show();
  }
};