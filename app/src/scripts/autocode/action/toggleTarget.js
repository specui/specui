autocode.action.toggleTarget = function() {
  if (autocode.data.current.tab == 'config') {
    var config = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(config);
    autocode.storage.set('config', config)
  }
  
  var rows = [];
  
  if (autocode.project.interfaces && autocode.project.interfaces.length) {
    for (var i = 0; i < autocode.project.interfaces.length; i++) {
      rows.push({
        icon: 'interface-icon',
        state: 'http://' + autocode.ws.ip + ':' + autocode.project.interfaces[i].port,
        text: autocode.project.interfaces[i].title
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