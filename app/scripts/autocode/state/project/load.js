autocode.state['project/load'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  autocode.api.repos.get({
    success: function(data) {
      console.log(data);
    }
  });
};