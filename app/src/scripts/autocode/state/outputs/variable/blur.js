autocode.state['outputs/output/variable/blur'] = function(opts) {
  var field = $('#outputs-content .content-center .schema input[name="' + opts.name + '"]');
  var output = autocode.project.outputs[autocode.data.current.output];
  var value = field.val();
  
  if (!output.spec) {
    output.spec = {};
  }
  output.spec[opts.name] = value;
  
  if (value.substr(0, 1) == '$' && autocode.project[value.substr(1)]) {
    value = autocode.project[value.substr(1)];
    field.addClass('variable').val(value);
  }
};