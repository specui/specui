autocode.state['project/save'] = function() {
  autocode.popup.open({
    title: 'Saving Project...'
  });
  autocode.popover.close();
  
  autocode.api.config.post({
    data: {
      config: autocode.project,
      repo: autocode.repo
    },
    error: function(data) {
      autocode.popup.open({
        title: 'Unable to Save Project',
        content: 'Please try again or contact us at <a href="mailto:support@crystal.sh">support@crystal.sh</a>.'
      });
    },
    success: function(data) {
      autocode.popup.close();
    }
  });
};