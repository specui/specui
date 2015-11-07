autocode.action.toggleTarget = function() {
  autocode.popover.toggle({
    rows: [
      {
        action: 'launch',
        icon: 'launch-icon',
        text: 'Launch Website'
      },
      {
        action: 'launch',
        icon: 'launch-icon',
        text: 'Launch API Tool'
      },
      {
        action: 'launch',
        icon: 'launch-icon',
        text: 'Launch CMS'
      },
      {
        action: 'reboot',
        icon: 'reboot-icon',
        style: 'divider',
        text: 'Reboot'
      },
      {
        action: 'reimage',
        icon: 'reimage-icon',
        text: 'Reimage'
      }
    ],
    left: $('#target-icon').offset().left,
    style: 'table',
    target: $('#user'),
    top: $('#main').outerHeight()
  });
  
  autocode.initState();
};