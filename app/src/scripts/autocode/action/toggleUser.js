autocode.action.toggleUser = function() {
  if (autocode.data.user) {
    autocode.popover.toggle({
      rows: [
        {
          icon: 'upgrade-icon',
          state: autocode.url.account(),
          text: 'Upgrade Account'
        },
        {
          action: 'editorSettings',
          icon: 'editor-icon',
          style: 'divider',
          text: 'Editor Settings'
        },
        {
          action: 'githubUser',
          icon: 'login-icon',
          text: 'View on GitHub'
        },
        {
          action: 'logout',
          icon: 'logout-icon',
          style: 'divider',
          text: 'Logout'
        }
      ],
      left: 0,
      style: 'table',
      target: $('#user'),
      top: $('#main').outerHeight()
    });
  } else {
    autocode.action.login();
  }
  
  autocode.initState();
};