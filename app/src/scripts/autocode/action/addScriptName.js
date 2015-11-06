autocode.action.addScriptName = function(opts) {
  $('#popup input[name="script"]').val(opts.name);
  autocode.fuzzy.close();
};