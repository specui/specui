autocode.action.addExportName = function(opts) {
  $('#popup input[name="type"]').val(opts.name);
  autocode.fuzzy.close();
};