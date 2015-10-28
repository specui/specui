autocode.action.toggleColumn = function(id, column, opts) {
  opts = opts || {};
  autocode.data.current.column = column;
  if ($(window).width() > autocode.mobile.minWidth) {
    $('#content').css({
      marginLeft: ''
    });
  } else if (opts.animated === false) {
    $('#content').css({
      marginLeft: $(window).width() * -(column - 1)
    });
  } else {
    $('#content').animate({
      marginLeft: $(window).width() * -(column - 1)
    });
  }
};