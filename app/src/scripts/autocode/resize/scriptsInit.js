autocode.resize.scriptsInit = function() {
  var scripts_init = $('#scripts-init');
  scripts_init.css({
    left: ($(window).width() - scripts_init.outerWidth()) / 2,
    top: ($(window).height() - scripts_init.outerHeight()) / 2
  });
};