autocode.action.importsTab = function(opts) {
  opts = opts || {};
  
  $('#imports-tabs a').removeClass('selected');
  $('#imports-' + opts.name + '-tab').addClass('selected');
  
  $('#imports-exports .imports-export').hide();
  $('#imports-exports-' + opts.name).show();
};