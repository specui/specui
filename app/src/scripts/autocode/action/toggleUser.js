autocode.action.toggleUser = function() {
  if (autocode.data.user) {
    autocode.popover.toggle({
      rows: [
        /*
        {
          icon: 'settings-icon',
          state: 'user/settings',
          text: 'Settings'
        },
        */
        {
          action: 'githubUser',
          icon: 'login-icon',
          text: 'View on GitHub'
        },
        {
          action: 'editorSettings',
          icon: 'editor-icon',
          style: 'divider',
          text: 'Editor Settings'
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