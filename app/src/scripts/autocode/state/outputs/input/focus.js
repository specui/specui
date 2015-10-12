autocode.state['outputs/input/focus'] = function() {
  var field = $(this);
  var field_name = field.attr('name');
  var value = field.val();
  
  if (
    autocode.project.outputs[autocode.data.current.output].spec
    &&
    autocode.project.outputs[autocode.data.current.output].spec[field_name]
    &&
    autocode.project.outputs[autocode.data.current.output].spec[field_name].substr(0, 1) == '$'
  ) {
    value = autocode.project.outputs[autocode.data.current.output].spec[field_name];
  }
  
  field
    .bind('keyup', autocode.state['outputs/input/fuzzy'])
    .removeClass('variable')
    .val(value);
};