autocode.action.addOutputGenerator = function(opts) {
  var current_generators = autocode.current.generators();
  $('#popup input[name="generator"]').val(opts.name);
  $('#popup input[name="filename"]').attr('placeholder', current_generators[opts.name] && current_generators[opts.name].filename ? current_generators[opts.name].filename : '');
  autocode.fuzzy.close();
};