autocode.resize.codePreview = function() {
  var code_preview = $('#code-preview');
  code_preview.css({
    height: $(window).height() - $('header').outerHeight() - $('#code-tabs').outerHeight() - $('footer').outerHeight(),
    width: $(window).width() - $('#output-content-container aside').first().outerWidth()
  });
};