autocode.action.closeProject = function(opts) {
  opts = opts || {};
  
  autocode.popover.close();
  
  if (opts.confirm !== true && autocode.data.originalConfig != jsyaml.safeDump(autocode.project)) {
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
  
  $('.app, #init').fadeOut(function() {
    $('#menu .text').text('Menu');
    $('#welcome').fadeIn();
  });
};