autocode.resize.content = function() {
  $('#content').css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight()
  });
  $('.content-center').css({
    width: $(window).width() - $('.content-left').outerWidth() - $('.content-right').outerWidth()
  });
  $('.content-left, .content-center, .content-right').css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight()
  });
};