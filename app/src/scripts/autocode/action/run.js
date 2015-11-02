autocode.action.run = function() {
  if (!autocode.project.outputs || !autocode.project.imports) {
    if (!autocode.project.imports) {
      autocode.popup.open({
        title: 'Unable to Build Project',
        content: '<div style="padding-bottom: 10px">You haven\'t imported any modules yet.</div>'
          + '<a class="button" href="imports">Import a Module</a> <button class="secondary" onclick="autocode.action.closePopup()">Cancel</button>'
      });
    } else {
      autocode.popup.open({
        title: 'Unable to Build Project',
        content: '<div style="padding-bottom: 10px">You haven\'t added any outputs to your Autocode configuration.</div>'
          + '<a class="button" href="config">Add an Output</a> <button class="secondary" onclick="autocode.action.closePopup()">Cancel</button>'
      });
    }
    
    return;
  }
  
  $('span span.icon.loader-icon').addClass('loading');
  
  if (autocode.data.current.tab == 'config') {
    autocode.project = jsyaml.safeLoad($('#config-content .CodeMirror')[0].CodeMirror.getValue());
  }
  
  autocode.api.run.post({
    data: autocode.project,
    complete: function() {
      $('span span.icon.loader-icon').removeClass('loading');
    },
    success: function(data) {
      $('#run-icon').addClass('stop');
    }
  });
};