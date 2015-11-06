autocode.action.loadScript = function(opts) {
  autocode.action.toggleColumn('scripts-content', 2);
  
  autocode.data.current.script = opts.repo;
  
  $('#scripts-content-container .table a').removeClass('selected');
  $('#scripts-content-container .table a').eq(opts.index).addClass('selected');
};