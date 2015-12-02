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
    
    return false;
  },
  open: function(opts) {
    // close popup
    autocode.popup.close();
    
    // create popup
    var popup = $(document.createElement('div'));
    popup.attr('id', 'popup');
    popup.hide();
    
    // append title to popup
    if (opts.title) {
      var title = $(document.createElement('div'));
      title.addClass('title');
      if (!opts.content) {
        title.css('paddingBottom', 0);
      }
      title.text(opts.title);
      popup.append(title);
    }
    
    // append error to popup
    var error = $(document.createElement('div'));
    error.addClass('error');
    popup.append(error);
    
    // append content to popup
    var content;
    if (opts.content) {
      content = $(document.createElement('div'));
      content.addClass('content');
      content.html(opts.content);
    } else {
      switch (opts.style) {
        case 'table':
          content = $(document.createElement('div'));
          content.addClass('table');
          
          var row, row_element, row_icon, row_text;
          for (var row_i = 0; row_i < opts.rows.length; row_i++) {
            row = opts.rows[row_i];
            
            row_element = $(document.createElement('a'));
            
            if (row.state) {
              row.attr('href', row.state);
            } else if (typeof(row.action) == 'object') {
              row.on('click', 'autocode.action.' + row.action.name + '(' + JSON.stringify(row.action.data) + ')');
            } else if (typeof(row.action) == 'string') {
              row.on('click', 'autocode.action.' + row.action + '()');
            }
            
            // add icon to row
            if (row.icon) {
              row_icon = $(document.createElement('span'));
              row_icon.addClass('icon');
              if (!row.icon.match(/^http/)) {
                row_icon.addClass(row.icon);
              } else {
                row_icon.css('backgroundImage', 'url(' + row.icon + ');');
              }
              if (row.style == 'divider') {
                row_icon.css('borderTop', '1px #CCC solid');
              }
            }
            
            // add text to row
            if (row.text) {
              row_text = $(document.createElement('span'));
              row_text.addClass('text');
              if (row.style == 'divider') {
                row_text.css('borderTop', '1px #CCC solid');
              }
              row_text.text(row.text);
            }
          }
          break;
      }
    }
    if (content) {
      popup.append(content);
    }
    
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
    $('#popup').animate({ opacity: 1 }, {
      complete: function() {
        $('#popup input, #popup textarea').first().focus().keyup();
        
        if (opts.complete) {
          opts.complete();
        }
      }
    });
    
    autocode.resize.all(['fuzzy', 'overlay', 'popup']);
    
    autocode.initState();
  }
};