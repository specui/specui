autocode.element.input = {
  html: function(opts) {
    var input = $(document.createElement('input'));
    
    if (opts.autocomplete === true) {
      input.attr('autocomplete', 'on');
    } else if (opts.autocomplete === false) {
      input.attr('autocomplete', 'off');
    }
    
    if (opts.class) {
      input.addClass(opts.class);
    }
    
    if (opts.event) {
      var e;
      for (var event_name in opts.event) {
        e = opts.event[event_name];
        input.bind(event_name, e);
      }
    }
    
    if (opts.name) {
      input.attr('name', opts.name);
    }
    
    if (opts.placeholder) {
      input.attr('placeholder', opts.placeholder);
    }
    
    if (opts.value) {
      input.val(opts.value);
    }
    
    return input;
  }
};