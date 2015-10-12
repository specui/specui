autocode.resize.fuzzy = function() {
  var fuzzy = $('#fuzzy');
  var fuzzy_target = fuzzy.data('target');
  if (fuzzy.length && fuzzy_target.length) {
    var fuzzy_box_shadow = '0px 5px 10px #999';
    var fuzzy_max_height = $(window).height() - (fuzzy_target.outerHeight() + fuzzy_target.offset().top) - 50;
    var fuzzy_max_top = fuzzy_target.outerHeight() + fuzzy_target.offset().top;
    
    if (fuzzy_max_height > 300) {
      fuzzy_max_height = 300;
    } else if (fuzzy_max_height < 100) {
      fuzzy_box_shadow = '0px -5px 10px #999';
      fuzzy_max_height = 300;
      fuzzy_max_top = fuzzy_target.offset().top - fuzzy_max_height;
    }
    
    fuzzy.css({
      boxShadow: fuzzy_box_shadow,
      left: fuzzy_target.offset().left,
      maxHeight: fuzzy_max_height,
      top: fuzzy_max_top,
      width: fuzzy_target.outerWidth()
    });
  }
};