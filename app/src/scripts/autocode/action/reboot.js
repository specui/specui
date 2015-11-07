autocode.action.reboot = function() {
  // close popover
  autocode.popover.close();
  
  // update status
  autocode.status.offline();
  
  $('span span.icon.loader-icon').addClass('loading');
  $('#target-icon .text').text('Rebooting...');
  
  autocode.api.reboot.post({
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log(data);
    }
  });
};