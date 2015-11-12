autocode.action.saveProject = function() {
  if (!autocode.repo) {
    return;
  }
  
  var config = autocode.storage.get('config');
  if (!config || typeof(config) != 'object') {
    config = {};
  }
  
  if (autocode.data.current.tab == 'config') {
    autocode.project = jsyaml.safeLoad($('#config-content .CodeMirror')[0].CodeMirror.getValue());
  }
  
  config[autocode.repo] = jsyaml.safeDump(autocode.project);
  
  autocode.storage.set('config', config);
};