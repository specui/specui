autocode.state['outputs/property/add/choose'] = function(opts) {
  $('#popup input[name="property"]').val(opts.name);
  if (autocode.data.generators[autocode.data.current.generator].schema.properties[opts.name].default) {
    $('#popup input[name="value"]').attr('placeholder', autocode.data.generators[autocode.data.current.generator].schema.properties[opts.name].default);
  } else {
    $('#popup input[name="value"]').attr('placeholder', '');
  }
  $('#popup input[name="value"]').val('');
  autocode.fuzzy.close();
};