autocode.element.radio = {
  event: {
    click: function(o) {
      var selected = o.hasClass('selected');
      
      o.parent().find('button').removeClass('selected');
      
      if (!selected) {
        o.addClass('selected');
        o.parent().find('input[type="hidden"]').val(o.val());
      } else {
        o.parent().find('input[type="hidden"]').val('');
      }
    }
  },
  html: function(opts) {
    var span = $(document.createElement('span'));
    span.addClass('radio');
    
    var button, option_text;
    for (var option_value in opts.options) {
      option_text = opts.options[option_value];
      
      button = $(document.createElement('button'));
      if ((opts.value || opts.value === false) && opts.value.toString() == option_value.toString()) {
        button.addClass('selected');
      }
      if ((opts.defaultValue || opts.defaultValue === false) && opts.defaultValue.toString() == option_value.toString()) {
        button.addClass('default');
      }
      button.attr('type', 'button');
      button.click(autocode.element.radio.event.click);
      button.text(option_text);
      button.val(option_value);
      span.append(button);
    }
    
    var input = $(document.createElement('input'));
    input.attr('name', opts.name);
    input.attr('type', 'hidden');
    input.val(opts.value || opts.value === false ? opts.value : '');
    span.append(input);
    
    return span;
  }
};