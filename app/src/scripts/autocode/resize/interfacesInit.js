autocode.resize.interfacesInit = function() {
  var interfaces_init = $('#interfaces-init');
  interfaces_init.css({
    left: ($(window).width() - interfaces_init.outerWidth()) / 2,
    top: ($(window).height() - interfaces_init.outerHeight()) / 2
  });
};