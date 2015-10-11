autocode.state['project/load'] = function() {
  autocode.popover.close();
  
  if (autocode.data.originalConfig && autocode.project && jsyaml.safeDump(autocode.data.originalConfig) != jsyaml.safeDump(autocode.project)) {
    autocode.popup.open({
      title: 'Close Project',
      content: '<div style="padding-bottom: 15px">Are you sure you want to close this project and load another? <b>You will lose all unsaved changes.</b></div>'
        + '<a class="button" href="popup/close">No, Keep It Open</a> <a class="button secondary" href="project/load/submit">Yes, Close Project</a> <a class="button secondary" href="project/diff">View Unsaved Changes</a>'
    });
    return;
  }
  
  autocode.state['project/load/submit']();
};