autocode.resize.content = function() {
  if ($(window).width() > 600) {
    $('#content').css({
      height: $(window).height() - $('header').outerHeight(),
      width: $(window).width()
    });
  } else {
    $('#content').css({
      height: $(window).height() - $('header').outerHeight(),
      width: $(window).width() * ($('.column:visible').length ? $('.column:visible').length : 1)
    });
  }
  if ($(window).outerWidth() < 600) {
    $('#content .column').css({
      width: $(window).width()
    });
    $('.content-center').css({
      width: $(window).width()
    });
    $('#content .column').each(function() {
      $(this).css({
        left: $(window).width() * $(this).index()
      })
    });
  } else {
    $('#content .column').css({
      width: ''
    });
    $('.content-center').css({
      width: $(window).width() - $('.content-left').outerWidth() - $('.content-right').outerWidth()
    });
    $('#content .column').each(function() {
      $(this).css({
        left: ''
      })
    });
  }
  if ($(window).width() > 600) {
    $('.content-left, .content-center, .content-right').css({
      height: $(window).height() - $('header').outerHeight()
    });
  } else {
    $('.content-left, .content-center, .content-right').css({
      height: ''
    });
  }
};