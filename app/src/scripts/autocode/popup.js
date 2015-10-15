autocode.popup = {
  close: function() {
    $('#popup, #overlay').remove();
  },
  error: function(msg) {
    if (msg === false) {
      $('#popup .error').hide();
    } else {
      $('#popup .error').text(msg).show();
    }
    
    autocode.resize.all();
  },
  open: function(opts) {
    autocode.popup.close();
    
    var popup = $(document.createElement('div'));
    popup.attr('id', 'popup');
    popup.hide();
    
    var html = '';
    if (opts.title) {
      html += '<div class="title"' + (opts.content ? '' : ' style="padding-bottom: 0px"') + '>' + opts.title + '</div>';
    }
    html += '<div class="error"></div>';
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
    
    if (opts.overlay !== false) {
      var overlay = $(document.createElement('div'));
      overlay.attr('id', 'overlay');
      overlay.click(function() {
        autocode.popup.close();
      });
      overlay.hide();
      $('body').append(overlay);
      $('#overlay').fadeIn();
    }
    
    $('#popup').css('opacity', 0.01).show();
    $('#popup input').first().focus().keyup();
    $('#popup').animate({ opacity: 1 });
    
    autocode.resize.all(['fuzzy', 'overlay', 'popup']);
    
    autocode.initState();
  }
};