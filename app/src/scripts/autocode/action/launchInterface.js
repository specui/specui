autocode.action.launchInterface = function() {
  var state = 'http://' + autocode.ws.ip;
  var interface_data = autocode.project.interfaces[autocode.data.current.interface];
  var port = interface_data.port;
  var path = interface_data.path;
  var params = interface_data.params;
  var name = interface_data.name;
  
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
  
  window.open(state, '_blank');
};