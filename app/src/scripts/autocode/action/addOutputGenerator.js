autocode.action.addOutputGenerator = function(opts) {
  var current_generators = autocode.current.generators();
  $('#popup input[name="generator"]').val(opts.name);
  
  console.log(current_generators[opts.name]);
  
  var filename = '';
  if (current_generators[opts.name] && current_generators[opts.name].filename) {
    if (typeof(current_generators[opts.name].filename) == 'object' && current_generators[opts.name].filename['value']) {
      filename = current_generators[opts.name].filename['value'];
    } else if (typeof(current_generators[opts.name].filename) == 'string') {
      filename = current_generators[opts.name].filename;
    }
  }
  
  $('#popup input[name="filename"]').attr('placeholder', filename);
  
  autocode.fuzzy.close();
};