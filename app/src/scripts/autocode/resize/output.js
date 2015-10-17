autocode.resize.output = function() {
  var output = $('#output-content .CodeMirror');
  output.css({
    height: $(window).height() - $('header').outerHeight()
  });
};