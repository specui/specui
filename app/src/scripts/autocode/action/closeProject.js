autocode.action.closeProject = function(opts) {
  opts = opts || {};
  
  history.pushState(null, null, '/');
  
  autocode.popover.close();
  
  var config = autocode.storage.get('config');
  if (
    opts.confirm !== true
    &&
    autocode.project
    &&
    (
      (config && config[autocode.repo] && config[autocode.repo] != jsyaml.safeDump(autocode.project))
      ||
      ((!config || !config[autocode.repo]) && autocode.data.originalConfig != jsyaml.safeDump(autocode.project))
    )
  ) {
    autocode.popup.open({
      title: 'Close Project',
      content: '<div style="padding-bottom: 15px">Are you sure you want to close this project? <b>You will lose all unsaved changes.</b></div>'
        + '<button onclick="autocode.action.closePopup()">No, Keep It Open</button> <button class="secondary" onclick="autocode.action.closeProject({ confirm: true })">Yes, Close Project</button> <button class="secondary" onclick="autocode.action.diff()">View Unsaved Changes</button>'
    });
    return;
  }
  
  autocode.unload.disable();
  
  autocode.data.current = {};
  delete(autocode.project);
  
  autocode.popup.close();
  
  $('#menu-project').hide();
  
  $('.app, #init, header').fadeOut(function() {
    $('#welcome').fadeIn();
  });
};