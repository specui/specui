autocode.resize.init = function() {
  var init = $('#init');
  init.css({
    left: ($(window).width() - init.outerWidth()) / 2,
    top: ($(window).height() - init.outerHeight()) / 2
  });
};