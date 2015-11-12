autocode.state.commitProjectSubmit = function() {
  var data = {
    config: autocode.project,
    message: $('#popup textarea[name="message"]').val(),
    repo: autocode.repo
  };
  
  autocode.popup.open({
    title: 'Saving Project...'
  });
  autocode.popover.close();
  
  autocode.api.config.post({
    data: data,
    error: function(data) {
      autocode.popup.open({
        title: 'Unable to Save Project',
        content: 'Please try again or contact us at <a href="mailto:support@autocode.run">support@autocode.run</a>.'
      });
    },
    success: function(data) {
      autocode.data.originalConfig = jsyaml.safeDump(autocode.project);
      autocode.popup.close();
    }
  });
};