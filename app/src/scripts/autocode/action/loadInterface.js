autocode.action.loadInterface = function(opts) {
  opts = opts || {};
  
  autocode.data.current.interface = opts.index || autocode.data.current.interface;
  
  $('#interfaces-content-container .table a').removeClass('selected');
  $('#interfaces-' + autocode.data.current.interface).addClass('selected');
  
  var interface_name = autocode.project.interfaces[autocode.data.current.interface].name;
  if (typeof(autocode.project.interfaces[autocode.data.current.interface].name) == 'string' && autocode.project.interfaces[autocode.data.current.interface].name.substr(0, 1) == '$' && autocode.project[autocode.project.interfaces[autocode.data.current.interface].name.substr(1)]) {
    interface_name = autocode.project[autocode.project.interfaces[autocode.data.current.interface].name.substr(1)];
  }
  
  $('#interfaces-title').text(interface_name);
  
  autocode.hint.init();
  
  autocode.resize.all();
};