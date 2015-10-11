autocode.state['menu'] = function() {
  autocode.popover.toggle({
    rows: [
      {
        text: 'New Project',
        icon: 'add-icon',
        state: 'project/new'
      },
      {
        text: 'Load Project',
        icon: 'load-icon',
        state: 'project/load',
        style: 'divider'
      },
      {
        text: 'Save Project',
        icon: 'save-icon',
        state: 'project/save'
      },
      {
        icon: 'login-icon',
        text: 'View on GitHub',
        state: 'github/repo',
        style: 'divider'
      }
    ],
    left: 0,
    style: 'table',
    top: $('header').outerHeight()
  });
};