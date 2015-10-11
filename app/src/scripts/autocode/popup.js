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
    if (!opts.content) {
      switch (opts.style) {
        case 'table':
          opts.content = '<div class="table">';
          for (var row_i = 0; row_i < opts.rows.length; row_i++) {
            opts.content += '<a href="' + opts.rows[row_i].state + '">'
                + '<span class="icon' + (!opts.rows[row_i].icon.match(/^http/) ? ' ' + opts.rows[row_i].icon : '') + '" style="' + (!!opts.rows[row_i].icon.match(/^http/) ? 'background-image: url(' + opts.rows[row_i].icon + ');' : '') + (opts.rows[row_i].style == 'divider' ? 'border-top: 1px #CCC solid' : '') + '"></span>'
                + '<span class="text"' + (opts.rows[row_i].style == 'divider' ? ' style="border-top: 1px #CCC solid"' : '') + '>' + opts.rows[row_i].text + '</span>'
              + '</a>';
          }
          opts.content += '</div>';
          break;
      }
    }
    if (opts.content) {
      html += '<div class="content">' + opts.content + '</div>';
    }
    popup.html(html);
    
    $('body').append(popup);
    
    $('#overlay').fadeIn();
    
    $('#popup').css('opacity', 0.01).show();
    $('#popup input').first().focus();
    $('#popup').animate({ opacity: 1 });
    
    autocode.resize();
    
    autocode.initState();
  }
};