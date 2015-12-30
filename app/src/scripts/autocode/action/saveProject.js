autocode.action.saveProject = function() {
  try {
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
          case 'engine': {
            autocode.project.exports[autocode.data.current.export].engine = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
            break;
          }
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
          case 'spec': {
            autocode.project.exports[autocode.data.current.export].spec = jsyaml.safeLoad($('#exports-content .CodeMirror')[0].CodeMirror.getValue());
            break;
          }
          case 'transformer': {
            autocode.project.exports[autocode.data.current.export].transformer = $('#exports-content .CodeMirror')[0].CodeMirror.getValue();
            break;
          }
        }
        break;
      }
      case 'outputs': {
        autocode.project.outputs[autocode.data.current.output].spec = jsyaml.safeLoad($('#outputs-content .CodeMirror')[0].CodeMirror.getValue());
        break;
      }
      case 'overview': {
        if ($('#overview-icon-subtab').hasClass('selected')) {
          var value = $('#overview-icon-content .CodeMirror')[0].CodeMirror.getValue();
          autocode.icon = value;
          var icon = autocode.storage.get('icon');
          if (!icon) {
            icon = {};
          }
          icon[autocode.repo]= value;
          autocode.storage.set('icon', icon);
          $('#project .icon').css('background-image', 'url(data:image/svg+xml;base64,' + btoa(value) + ')');
        }
        break;
      }
    }
    
    config[autocode.repo] = jsyaml.safeDump(autocode.project);
    
    autocode.storage.set('config', config);
  } catch (e) {
    autocode.error.add(e);
  }
};