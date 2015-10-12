autocode.resize.hint = function() {
  var hint = $('#hint'),
    hint_target = $('#hint').data('target');
  if (hint.length && hint_target.length) {
    hint.css({
      left: hint_target.offset().left - ((hint.outerWidth() - hint_target.outerWidth()) / 2),
      top: hint_target.outerHeight() + hint_target.offset().top + 10
    });
  }
};