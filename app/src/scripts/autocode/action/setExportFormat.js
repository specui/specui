autocode.action.setExportFormat = function(opts) {
  $('#popup input[name="format"]').val(opts.name);
  autocode.fuzzy.close();
};