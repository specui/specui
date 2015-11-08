autocode.action.toggleMore = function() {
  autocode.popover.toggle({
    rows: [
      {
        action: 'halt',
        icon: 'halt-icon',
        text: 'Halt Process'
      },
      {
        action: 'clean',
        icon: 'clean-icon',
        style: 'divider',
        text: 'Clean Project'
      },
      {
        action: 'upgrade',
        icon: 'upgrade-icon',
        text: 'Upgrade Project'
      },
      {
        action: 'toggleConsole',
        icon: 'console-icon',
        style: 'divider',
        text: $('#console').is(':visible')
          ? 'Hide Console'
          : 'Show Console'
      }
    ],
    left: $('#more-icon').offset().left,
    style: 'table',
    target: $('#more-icon'),
    top: $('#main').outerHeight()
  });
  
  autocode.initState();
};