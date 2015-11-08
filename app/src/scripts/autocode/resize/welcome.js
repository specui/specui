autocode.resize.welcome = function() {
  var welcome = $('#welcome');
  if (welcome.outerHeight() > $(window).height() && welcome.outerWidth() > autocode.mobile.minWidth) {
    welcome.css({
      left: ($(window).width() - welcome.outerWidth()) / 2,
      position: 'absolute',
      top: $('header').outerHeight() + 20
    });
  } else {
    welcome.css({
      left: ($(window).width() - welcome.outerWidth()) / 2,
      position: '',
      top: (($(window).height() - $('footer').visibleHeight() - $('#console').visibleHeight()) - welcome.outerHeight()) / 2
    });
  }
};