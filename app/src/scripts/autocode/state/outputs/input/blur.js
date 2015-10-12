autocode.state['outputs/input/blur'] = function() {
  var field = $(this);
  var field_name = field.attr('name');
  var output = autocode.project.outputs[autocode.data.current.output];
  var value = field.val();
  
  field.unbind('keyup', autocode.state['outputs/input/fuzzy']);
  
  if (!output.spec) {
    output.spec = {};
  }
  
  if (field_name.match(/\[[0-9]*\]/)) {
    if (!output.spec[field_name.split('[')[0]]) {
      output.spec[field_name.split('[')[0]] = {};
    }
    if (field_name.match(/\[key\]/)) {
      var field_key = $(this).val();
      var field_value = $(this).next().val();
    } else {
      var field_key = $(this).prev().val();
      var field_value = $(this).val();
    }
    
    output.spec[field_name.split('[')[0]][field_key] = field_value;
    
  } else {
    output.spec[field_name] = value;
  }
  
  if (value.substr(0, 1) == '$' && autocode.project[value.substr(1)]) {
    value = autocode.project[value.substr(1)];
    field.addClass('variable').val(value);
  }
};