autocode.resize.outputs = function() {
  var outputs = $('#outputs-content .CodeMirror');
  outputs.css({
    height: $(window).height() - $('header').outerHeight() - $('footer').outerHeight() - $('#outputs-tabs').outerHeight() - 20
  });
};