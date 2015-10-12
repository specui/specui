autocode.resize.popup = function() {
  var popup = $('#popup');
  $('#popup .content').css('maxHeight', $(window).height() - 100);
  popup.css({
    left: ($(window).width() - popup.outerWidth()) / 2,
    top: ($(window).height() - popup.outerHeight()) / 2
  });
};