autocode.state['user'] = function() {
  if (autocode.user.isLoggedIn) {
    autocode.popover.toggle({
      rows: [
        {
          state: 'user/profile',
          text: 'Edit Profile'
        },
        {
          state: 'user/settings',
          text: 'Settings'
        },
        {
          icon: 'login-icon',
          text: 'View on GitHub',
          state: 'github/user',
          style: 'divider'
        },
        {
          state: 'user/logout',
          style: 'divider',
          text: 'Logout'
        }
      ],
      right: 0,
      style: 'table',
      target: $('#user'),
      top: $('header').outerHeight()
    });
  } else {
    autocode.popover.toggle({
      content:
        '<div class="table">'
          + '<a href="user/login"><span class="name">Login with GitHub</span></a>'
        + '</div>',
      right: 0,
      target: $('#user'),
      top: $('header').outerHeight()
    });
  }
};