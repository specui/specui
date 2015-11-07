autocode.resize.config = function() {
  var config = $('#config-content .CodeMirror');
  config.css({
    height: $(window).height() - $('header').outerHeight() - $('footer').outerHeight() - $('#console').visibleHeight()
  });
};