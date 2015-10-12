autocode.element.radio = {
  event: {
    click: function() {
      var field = $(this);
      var selected = $(this).hasClass('selected');
      
      field.parent().find('button').removeClass('selected');
      
      if (!selected) {
        field.addClass('selected');
        field.parent().find('input[type="hidden"]').val(field.val());
      } else {
        field.parent().find('input[type="hidden"]').val('');
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