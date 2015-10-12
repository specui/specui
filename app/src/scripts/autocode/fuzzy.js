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
      row_link.attr('href', row.state);
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
        row_link.append(row_icon);
      }
      
      row_text = $(document.createElement('span'));
      row_text.addClass('text');
      row_text.html(row.text.replace(new RegExp('(' + opts.value + ')', 'i'), '<b>$1</b>'));
      row_link.append(row_text);
    }
    
    fuzzy.html(table);
    
    autocode.initState();
    
    autocode.resize.fuzzy();
  }
};