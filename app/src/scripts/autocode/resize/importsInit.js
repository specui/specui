autocode.resize.importsInit = function() {
  var imports_init = $('#imports-init');
  imports_init.css({
    left: ($(window).width() - imports_init.outerWidth()) / 2,
    top: ($(window).height() - imports_init.outerHeight()) / 2
  });
};