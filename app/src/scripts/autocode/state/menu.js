autocode.state['menu'] = function() {
  var rows = [];
  if (autocode.project) {
    rows.push({
      text: 'Save Project (Ctrl+Shift+S)',
      icon: 'save-icon',
      state: 'project/save'
    });
    rows.push({
      text: 'Close Project',
      icon: 'close-icon',
      state: 'home'
    });
    rows.push({
      icon: 'login-icon',
      text: 'View on GitHub',
      state: 'github/repo'
    });
  }
  
  rows.push({
    text: 'New Project (Ctrl+Shift+N)',
    icon: 'add-icon',
    state: 'project/new',
    style: 'divider'
  });
  rows.push({
    text: 'Load Project (Ctrl+Shift+O)',
    icon: 'load-icon',
    state: 'project/load',
  });
  
  autocode.popover.toggle({
    rows: rows,
    left: 0,
    style: 'table',
    target: $('#menu'),
    top: $('header').outerHeight()
  });
};