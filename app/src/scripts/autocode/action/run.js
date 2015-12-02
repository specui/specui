autocode.action.run = function() {
  if (autocode.data.current.running) {
    autocode.data.current.running = false;
    
    autocode.ws.io.emit('stop', {
      config: jsyaml.safeDump(autocode.project),
      project: autocode.repo.split('/')[1],
      user: autocode.repo.split('/')[0]
    });
    
    return;
  }
  
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
  
  autocode.data.current.running = true;
    
  if (autocode.data.current.tab == 'config') {
    autocode.project = jsyaml.safeLoad($('#config-content .CodeMirror')[0].CodeMirror.getValue());
  }
  
  autocode.ws.io.emit('run', {
    config: jsyaml.safeDump(autocode.project),
    project: autocode.repo.split('/')[1],
    user: autocode.repo.split('/')[0]
  });
};