autocode.resize.outputsInit = function() {
  var spec = $('#outputs-content .CodeMirror');
  spec.css({
    height: $(window).height() - $('header').outerHeight() - $('footer').outerHeight() - $('#exports-tabs').outerHeight() - 20
  });
  var outputs_init = $('#outputs-init');
  outputs_init.css({
    left: ($(window).width() - outputs_init.outerWidth()) / 2,
    top: ($(window).height() - outputs_init.outerHeight()) / 2
  });
};