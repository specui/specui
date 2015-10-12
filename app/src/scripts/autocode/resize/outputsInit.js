autocode.resize.outputsInit = function() {
  var outputs_init = $('#outputs-init');
  outputs_init.css({
    left: ($(window).width() - outputs_init.outerWidth()) / 2,
    top: ($(window).height() - outputs_init.outerHeight()) / 2
  });
};