autocode.resize.exports = function() {
  var exports = $('#exports-content .CodeMirror');
  exports.css({
    height: $(window).height() - $('header').outerHeight() - $('footer').outerHeight() - 20
  });
};