autocode.resize.config = function() {
  var config = $('#config-content .CodeMirror');
  config.css({
    height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight() - 4
  });
};