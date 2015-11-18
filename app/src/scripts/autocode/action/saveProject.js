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
      var Export = autocode.project.exports[autocode.data.current.export];
      switch (Export.type) {
        case 'helper': {
          autocode.project.exports[autocode.data.current.export].helper = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
          break;
        }
        case 'processor': {
          autocode.project.exports[autocode.data.current.export].processor = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
          break;
        }
        case 'generator': {
          autocode.project.exports[autocode.data.current.export].template = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
          break;
        }
        case 'schema': {
          autocode.project.exports[autocode.data.current.export].schema = jsyaml.safeLoad($('#exports-content .CodeMirror')[0].CodeMirror.getValue());
          break;
        }
      }
      break;
    }
  }
  
  config[autocode.repo] = jsyaml.safeDump(autocode.project);
  
  autocode.storage.set('config', config);
};