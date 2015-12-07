autocode.fuzzy = {
  close: function() {
    $('#fuzzy').remove();
  },
  open: function(opts) {
    var fuzzy = $('#fuzzy');
    if (!fuzzy.length) {
      fuzzy = $(document.createElement('div'));
      $('body').append(fuzzy);
    }
    fuzzy.attr('id', 'fuzzy');
    fuzzy.data('target', opts.target);
    
    var icons_exist = false;
    for (var i = 0; i < opts.rows.length; i++) {
      if (opts.rows[i].icon) {
        icons_exist = true;
        break;
      }
    }
    
    var table = $(document.createElement('div'));
    table.addClass('table');
    
    var row_icon,
      row_link,
      row_text;
    for (var i = 0; i < opts.rows.length; i++) {
      row = opts.rows[i];
      
      row_link = $(document.createElement('a'));
      if (row.click) {
        row_link.on('click', row.click);
      } else if (row.state) {
        row_link.attr('href', row.state);
      } else if (typeof(row.action) == 'object') {
        row_link.attr('onclick', 'autocode.action[\'' + row.action.name + '\'](' + JSON.stringify(row.action.data) + ')');
      } else if (typeof(row.action) == 'string') {
        row_link.attr('onclick', 'autocode.action[\'' + row.action + '\']()');
      }
      table.append(row_link);
      
      if (icons_exist) {
        row_icon = $(document.createElement('span'));
        row_icon.addClass('icon');
        if (row.icon) {
          if (row.icon.match(/^https?:/)) {
            row_icon.css('background-image', 'url(' + row.icon + ')');
          } else {
            row_icon.addClass(row.icon);
          }
        }
        if (row.style == 'divider') {
          row_icon.css('border-top', '1px #CCC solid');
        }
        row_link.append(row_icon);
      }
      
      row_text = $(document.createElement('span'));
      row_text.addClass('text');
      row_text.html(row.text.replace(new RegExp('(' + opts.value + ')', 'i'), '<b>$1</b>'));
      if (row.style == 'divider') {
        row_text.css('border-top', '1px #CCC solid');
      }
      row_link.append(row_text);
    }
    
    fuzzy.html(table);
    
    autocode.initState();
    
    autocode.resize.fuzzy();
  }
};