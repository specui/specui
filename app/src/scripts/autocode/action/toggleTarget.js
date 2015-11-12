autocode.action.toggleTarget = function() {
  if (autocode.data.current.tab == 'config') {
    var config = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(config);
  }
  
  var rows = [];
  
  if (autocode.project.interfaces && autocode.project.interfaces.length) {
    var state, port, path, params, name;
    for (var i = 0; i < autocode.project.interfaces.length; i++) {
      state = 'http://' + autocode.ws.ip;
      port = autocode.project.interfaces[i].port;
      path = autocode.project.interfaces[i].path;
      params = autocode.project.interfaces[i].params;
      name = autocode.project.interfaces[i].name;
      
      if (port) {
        if (typeof(port) == 'string' && port.substr(0, 1) == '$' && autocode.project[port.substr(1)]) {
          port = autocode.project[port.substr(1)];
        }
        state += ':' + port;
      }
      if (path) {
        if (typeof(path) == 'string' && path.substr(0, 1) == '$' && autocode.project[path.substr(1)]) {
          path = autocode.project[path.substr(1)];
        }
        state += path;
      }
      if (params) {
        if (typeof(params) == 'string' && params.substr(0, 1) == '$' && autocode.project[params.substr(1)]) {
          params = autocode.project[params.substr(1)];
        }
        state += '?' + autocode.query.build(params);
      }
      if (typeof(name) == 'string' && name.substr(0, 1) == '$' && autocode.project[name.substr(1)]) {
        name = autocode.project[name.substr(1)];
      }
      
      rows.push({
        icon: 'interface-icon',
        state: state,
        text: name
      });
    }
  }
  
  rows.push({
    action: 'reboot',
    icon: 'reboot-icon',
    style: 'divider',
    text: 'Reboot'
  });
  rows.push({
    action: 'reimage',
    icon: 'reimage-icon',
    text: 'Reimage'
  });
  
  autocode.popover.toggle({
    rows: rows,
    left: $('#target-icon').offset().left,
    style: 'table',
    target: $('#user'),
    top: $('#main').outerHeight()
  });
  
  autocode.initState();
};