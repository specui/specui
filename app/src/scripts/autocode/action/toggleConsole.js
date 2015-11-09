autocode.action.toggleConsole = function() {
  // close popover
  autocode.popover.close();
  
  // toggle console
  var showConsole = autocode.storage.get('showConsole');
  if (showConsole) {
    autocode.storage.remove('showConsole');
    $('#console').hide();
  } else {
    autocode.storage.set('showConsole', true);
    $('#console').show();
  }
  
  autocode.resize.all(['config','content','footer']);
  
  $('#console .content').scrollTop($('#console .content')[0].scrollHeight);
};