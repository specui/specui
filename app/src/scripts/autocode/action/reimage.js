autocode.action.reimage = function() {
  // close popover
  autocode.popover.close();
  
  // update status
  autocode.status.offline();
  
  // hide usage
  $('#usage-on').hide();
  $('#usage-off').show();
  
  $('#target-icon .text').text('Reimaging...');
  
  autocode.api.reimage.post({
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log(data);
    }
  });
};