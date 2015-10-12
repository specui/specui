autocode.resize.loader = function() {
  var loader = $('#loader');
  loader.css({
    left: ($(window).width() - loader.outerWidth()) / 2,
    top: ($(window).height() - loader.outerHeight()) / 2
  });
};