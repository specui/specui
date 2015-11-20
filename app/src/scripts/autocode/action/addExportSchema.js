autocode.action.addExportSchema = function(opts) {
  $('#popup input[name="schema"]').val(opts.name);
  autocode.fuzzy.close();
};