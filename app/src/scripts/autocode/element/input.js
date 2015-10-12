autocode.element.input = {
  html: function(opts) {
    var html = '<input';
    
    if (opts.autocomplete) {
      html += ' autocomplete="' + (opts.autocomplete ? 'on' : 'off') + '"';
    }
    if (opts.name) {
      html += ' name="' + opts.name + '"';
    }
    if (opts.placeholder) {
      html += ' placeholder="' + opts.placeholder + '"';
    }
    if (opts.value) {
      html += ' value="' + opts.value + '"';
    }
    
    html += ' />';
    
    return html;
  }
};