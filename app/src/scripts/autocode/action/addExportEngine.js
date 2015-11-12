autocode.action.addExportEngine = function(opts) {
  $('#popup input[name="engine"]').val(opts.name);
  autocode.fuzzy.close();
};