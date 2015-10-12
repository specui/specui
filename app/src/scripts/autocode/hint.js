autocode.hint = {
  close: function(opts) {
    $('#hint').remove();
  },
  init: function() {
    $('*[data-hint]').each(function() {
      $(this).bind({
        mouseenter: function() {
          autocode.hint.open({
            target: $(this),
            text: $(this).data('hint')
          });
          
          autocode.resize();
        },
        mouseleave: function() {
          autocode.hint.close();
        }
      });
    });
  },
  open: function(opts) {
    var hint = $('#hint');
    if (!hint.length) {
      hint = $(document.createElement('hint'));
      hint.attr('id', 'hint');
      $('body').append(hint);
    }
    
    hint.data('target', opts.target);
    hint.html(opts.text);
  }
};