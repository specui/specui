autocode.resize = function() {
  var window_height = $(window).height();
  var window_width = $(window).width();
  
  $('#content').css({
    height: window_height - $('header').outerHeight() - $('#tabs').outerHeight()
  });
  $('.content-center').css({
    width: window_width - $('.content-left').outerWidth() - $('.content-right').outerWidth()
  });
  
  var loader = $('#loader');
  loader.css({
    left: (window_width - loader.outerWidth()) / 2,
    top: (window_height - loader.outerHeight()) / 2
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

$(window).load(autocode.resize);