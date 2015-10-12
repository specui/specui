autocode.state['outputs/output/variable'] = function(opts) {
  var output = autocode.project.outputs[autocode.data.current.output];
  var value = output.spec && output.spec[opts.name] ? output.spec[opts.name] : '';
  $('#outputs-content .content-center .schema input[name="' + opts.name + '"]').removeClass('variable').val(value);
};