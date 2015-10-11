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
  
  var config = $('#config-content .CodeMirror');
  config.css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight() - 4
  });
  
  var exports_init = $('#exports-init');
  exports_init.css({
    left: (window_width - exports_init.outerWidth()) / 2,
    top: ($(window).height() - exports_init.outerHeight()) / 2
  });
  
  var hint = $('#hint'),
    hint_target = $('#hint').data('target');
  if (hint.length && hint_target.length) {
    hint.css({
      left: hint_target.offset().left - ((hint.outerWidth() - hint_target.outerWidth()) / 2),
      top: hint_target.outerHeight() + hint_target.offset().top + 10
    });
  }
  
  var imports_init = $('#imports-init');
  imports_init.css({
    left: (window_width - imports_init.outerWidth()) / 2,
    top: ($(window).height() - imports_init.outerHeight()) / 2
  });
  
  var fuzzy = $('#fuzzy'),
    fuzzy_target = $('#fuzzy').data('target');
  if (fuzzy.length && fuzzy_target.length) {
    fuzzy.css({
      left: fuzzy_target.offset().left,
      top: fuzzy_target.outerHeight() + fuzzy_target.offset().top,
      width: fuzzy_target.outerWidth()
    });
  }
  
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
  $('#popup .content').css('maxHeight', $(window).height() - 100);
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