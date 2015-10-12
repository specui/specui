autocode.resize.exportsInit = function() {
  var exports_init = $('#exports-init');
  exports_init.css({
    left: ($(window).width() - exports_init.outerWidth()) / 2,
    top: ($(window).height() - exports_init.outerHeight()) / 2
  });
};