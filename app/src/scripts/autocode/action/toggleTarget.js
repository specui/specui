autocode.action.toggleTarget = function() {
  if (autocode.data.current.tab == 'config') {
    var config = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(config);
    autocode.storage.set('config', config)
  }
  
  var rows = [];
  
  if (autocode.project.services && autocode.project.services.length) {
    for (var i = 0; i < autocode.project.services.length; i++) {
      rows.push({
        icon: 'service-icon',
        state: 'http://' + autocode.ws.ip + ':' + autocode.project.services[i].port,
        text: autocode.project.services[i].title
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