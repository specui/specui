autocode.state['interfaces'] = function() {
  $('#interfaces-content-container .table a').slice(1).remove();
  
  var interface_data, interface_name;
  for (var interface_i in autocode.project.interfaces) {
    interface_data = autocode.project.interfaces[interface_i];
    interface_name = interface_data.name;
    
    if (typeof(interface_name) == 'string' && interface_name.substr(0, 1) == '$' && autocode.project[interface_name.substr(1)]) {
      interface_name = autocode.project[interface_name.substr(1)];
    }
    
    $('#interfaces-content-container .table').append(
      '<a class="file" id="interfaces-' + interface_i + '" onclick="autocode.action.loadInterface({ index: \'' + interface_i + '\' })">'
        + '<span class="icon interface-icon"></span>'
        + '<span class="info">'
          + '<span class="name">' + interface_name + '</span>'
        + '</span>'
      + '</a>'
    );
  }
  
  autocode.initState()
  
  autocode.action.toggleSection('interfaces');
};