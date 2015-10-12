autocode.resize.welcome = function() {
  var welcome = $('#welcome');
  if (welcome.outerHeight() > $(window).height()) {
    welcome.css({
      left: ($(window).width() - welcome.outerWidth()) / 2,
      position: 'absolute',
      top: $('header').outerHeight() + 20
    });
  } else {
    welcome.css({
      left: ($(window).width() - welcome.outerWidth()) / 2,
      position: '',
      top: ($(window).height() - welcome.outerHeight()) / 2
    });
  }
};