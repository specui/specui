autocode.state['outputs/output/variable'] = function(opts) {
  var field = $('#outputs-content .content-center .schema input[name="' + opts.name + '"]');
  var output = autocode.project.outputs[autocode.data.current.output];
  var value = output.spec && output.spec[opts.name] ? output.spec[opts.name] : '';
  field.removeClass('variable').val(value);
  
  field.bind('keyup', autocode.state['outputs/output/variable/key']);
};