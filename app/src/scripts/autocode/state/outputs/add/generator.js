autocode.state['outputs/add/generator'] = function(opts) {
  $('#popup input[name="generator"]').val(opts.name);
  $('#popup input[name="filename"]').attr('placeholder', autocode.data.generators[opts.name].filename);
  autocode.fuzzy.close();
};