autocode.resize = function() {
  var window_height = $(window).height();
  var window_width = $(window).width();
  
  $('#content').css({
    height: window_height - $('header').outerHeight() - $('#tabs').outerHeight()
  });
  $('.content-center').css({
    height: window_height - $('header').outerHeight() - $('#tabs').outerHeight(),
    width: window_width - $('.content-left').outerWidth() - $('.content-right').outerWidth()
  });
  
  var exports_init = $('#exports-init');
  exports_init.css({
    left: (window_width - exports_init.outerWidth()) / 2,
    top: ($(window).height() - exports_init.outerHeight()) / 2
  });
  
  var imports_init = $('#imports-init');
  imports_init.css({
    left: (window_width - imports_init.outerWidth()) / 2,
    top: ($(window).height() - imports_init.outerHeight()) / 2
  });
  
  var init = $('#init');
  init.css({
    left: (window_width - init.outerWidth()) / 2,
    top: ($(window).height() - init.outerHeight()) / 2
  });
  
  var loader = $('#loader');
  loader.css({
    left: (window_width - loader.outerWidth()) / 2,
    top: (window_height - loader.outerHeight()) / 2
  });
  
  var outputs_init = $('#outputs-init');
  outputs_init.css({
    left: (window_width - outputs_init.outerWidth()) / 2,
    top: ($(window).height() - outputs_init.outerHeight()) / 2
  });
  
  var overlay = $('#overlay');
  overlay.css({
    height: window_height,
    width: window_width
  });
  
  var popup = $('#popup');
  popup.css({
    left: (window_width - popup.outerWidth()) / 2,
    top: ($(window).height() - popup.outerHeight()) / 2
  });
  
  var welcome = $('#welcome');
  welcome.css({
    left: (window_width - welcome.outerWidth()) / 2,
    top: ($(window).height() - welcome.outerHeight()) / 2
  });
};

$(window).resize(autocode.resize);