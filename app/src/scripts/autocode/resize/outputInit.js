autocode.resize.outputInit = function() {
  var output_init = $('#output-init');
  output_init.css({
    left: ($(window).width() - output_init.outerWidth()) / 2,
    top: ($(window).height() - output_init.outerHeight()) / 2
  });
};