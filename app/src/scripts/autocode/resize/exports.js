autocode.resize.exports = function() {
  var exports = $('#exports-content .CodeMirror');
  exports.css({
    height: $(window).height() - $('header').outerHeight() - 20
  });
};