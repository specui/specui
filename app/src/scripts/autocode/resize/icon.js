autocode.resize.icon = function() {
  var config = $('#overview-icon-content .CodeMirror');
  config.css({
    height: $(window).height()
      - $('#overview-icon-content img').outerHeight()
      - $('header').outerHeight()
      - $('footer').outerHeight()
      - $('#console').visibleHeight()
      - 30
  });
};