autocode.resize.content = function() {
  $('#content').css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight()
  });
  $('.content-center').css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight(),
    width: $(window).width() - $('.content-left').outerWidth() - $('.content-right').outerWidth()
  });
};