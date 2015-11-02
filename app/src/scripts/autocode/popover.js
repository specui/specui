autocode.popover = {
  close: function() {
    $('#popover').remove();
  },
  open: function(opts) {
    var popover = $(document.createElement('div'));
    popover.attr('id', 'popover');
    if (opts.bottom !== undefined) {
      popover.css('bottom', opts.bottom);
    }
    if (opts.left !== undefined) {
      popover.css('left', opts.left);
    }
    if (opts.right !== undefined) {
      popover.css('right', opts.right);
    }
    if (opts.top !== undefined) {
      popover.css('top', opts.top);
    }
    popover.data('target', opts.target);
    if (!opts.content) {
      switch (opts.style) {
        case 'table':
          opts.content = '<div class="table">';
          var row_action;
          for (var row_i = 0; row_i < opts.rows.length; row_i++) {
            if (opts.rows[row_i].state) {
              row_action = ' href="' + opts.rows[row_i].state + '"';
            } else if (typeof(opts.rows[row_i].action) == 'object') {
              row_action = ' onclick="autocode.action.' + opts.rows[row_i].action.name + '(' + JSON.stringify(opts.rows[row_i].action.data) + ')"';
            } else if (typeof(opts.rows[row_i].action) == 'string') {
              row_action = ' onclick="autocode.action.' + opts.rows[row_i].action + '()"';
            } else {
              row_action = '';
            }
            
            opts.content += '<a' + row_action + '>'
                + '<span class="icon ' + opts.rows[row_i].icon + '"' + (opts.rows[row_i].style == 'divider' ? ' style="border-top: 1px #CCC solid"' : '') + '></span>'
                + '<span class="text"' + (opts.rows[row_i].style == 'divider' ? ' style="border-top: 1px #CCC solid"' : '') + '>' + opts.rows[row_i].text + '</span>'
              + '</a>';
          }
          opts.content += '</div>';
          break;
      }
    }
    popover.html(opts.content);
    popover.hide();
    $('body').append(popover);
    popover.slideDown();
  },
  toggle: function(opts) {
    if ($('#popover').length) {
      var target = $('#popover').data('target')
      $('#popover').remove();
      if (opts.target.attr('id') != target.attr('id')) {
        autocode.popover.open(opts);
      }
    } else {
      autocode.popover.open(opts);
    }
  }
};