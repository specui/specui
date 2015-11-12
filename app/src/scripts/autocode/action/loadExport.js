autocode.action.loadExport = function(opts) {
  opts = opts || {};
  
  autocode.data.current.export = opts.name || autocode.data.current.export;
  
  $('#exports-content-container .table a').removeClass('selected');
  $('#exports-' + autocode.data.current.export).addClass('selected');
  
  autocode.hint.init();
  
  autocode.resize.all();
};