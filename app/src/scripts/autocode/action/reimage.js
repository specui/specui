autocode.action.reimage = function() {
  // close popover
  autocode.popover.close();
  
  // update status
  autocode.status.offline();
  
  $('span span.icon.loader-icon').addClass('loading');
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