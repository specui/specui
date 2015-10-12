autocode.state['outputs/property/add/choose'] = function(opts) {
  $('#popup input[name="property"]').val(opts.name);
  
  var value;
  switch (autocode.data.generators[autocode.data.current.generator].schema.properties[opts.name].type) {
    case 'boolean': {
      value = autocode.element.radio.html({
        options: {
          true: 'True',
          false: 'False'
        },
        name: 'value'
      });
      break;
    }
    default: {
      value = autocode.element.input.html({
        name: 'value',
        placeholder: autocode.data.generators[autocode.data.current.generator].schema.properties[opts.name].default
          ? autocode.data.generators[autocode.data.current.generator].schema.properties[opts.name].default
          : null
      });
      break;
    }
  }
  
  if ($('#popup .radio').length) {
    $('#popup .radio').replaceWith(value);
  } else {
    $('#popup input[name="value"]').replaceWith(value);
  }
  
  autocode.fuzzy.close();
};