autocode.action.saveProject = function() {
  if (!autocode.repo) {
    return;
  }
  
  var config = autocode.storage.get('config');
  if (!config || typeof(config) != 'object') {
    config = {};
  }
  
  switch (autocode.data.current.tab) {
    case 'config': {
      autocode.project = jsyaml.safeLoad($('#config-content .CodeMirror')[0].CodeMirror.getValue());
      break;
    }
    case 'exports': {
      autocode.project.exports[autocode.data.current.export].template = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
      break;
    }
  }
  
  config[autocode.repo] = jsyaml.safeDump(autocode.project);
  
  autocode.storage.set('config', config);
};