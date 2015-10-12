autocode.state['outputs/input/add'] = function(opts) {
  var field = $('#fuzzy').data('target');
  field.val('$' + opts.name).blur();
  
  autocode.fuzzy.close();
};