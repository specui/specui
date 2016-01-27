autocode.action.generate = function() {
  if (autocode.data.current.tab == 'config') {
    var config = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(config);
  }
  
  autocode.ws.io.emit('generate', {
    config: jsyaml.safeDump(autocode.project),
    project: autocode.repo.split('/')[1],
    user: autocode.repo.split('/')[0]
  });
};