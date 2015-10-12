autocode.element.radio = {
  event: {
    click: function(o, value) {
      o = $(o);
      
      var selected = o.hasClass('selected');
      
      o.parent().find('button').removeClass('selected');
      
      if (!selected) {
        o.addClass('selected');
        o.parent().find('input[type="hidden"]').val(value);
      } else {
        o.parent().find('input[type="hidden"]').val('');
      }
    }
  },
  html: function(opts) {
    var html = '<span class="radio">';
    
    var option_text;
    for (var option_value in opts.options) {
      option_text = opts.options[option_value];
      
      html += '<button' + ((opts.value || opts.value === false) && opts.value.toString() == option_value.toString() ? ' class="selected"' : '') + ' onclick="autocode.element.radio.event.click(this, \'' + option_value + '\')" type="button">'
      html += option_text;
      html += '</button>';
    }
    
    html += '<input name="' + opts.name + '" type="hidden" value="' + (opts.value || opts.value === false ? opts.value : '') + '" />';
    html += '</span>';
    
    return html;
  }
};