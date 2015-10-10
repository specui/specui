autocode.popup = {
  close: function() {
    $('#popup, #overlay').remove();
  },
  open: function(opts) {
    autocode.popup.close();
    
    var overlay = $(document.createElement('div'));
    overlay.attr('id', 'overlay');
    overlay.click(function() {
      autocode.popup.close();
    });
    overlay.hide();
    $('body').append(overlay);
    
    var popup = $(document.createElement('div'));
    popup.attr('id', 'popup');
    popup.hide();
    
    var html = '';
    if (opts.title) {
      html += '<div class="title">' + opts.title + '</div>';
    }
    if (opts.content) {
      html += '<div class="content">' + opts.content + '</div>';
    }
    popup.html(html);
    
    $('body').append(popup);
    
    $('#popup, #overlay').fadeIn();
    
    autocode.resize();
  }
};