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
      top: $('header').outerHeight()
    });
  } else {
    autocode.popover.toggle({
      content:
        '<div class="table">'
          + '<a href="https://github.com/login/oauth/authorize?client_id=1a72d9c6a9602772d577&redirect_uri=http://alpha.crystal.sh:8080/accounts/connect/github&scope=user:email"><span class="name">Login with GitHub</span></a>'
        + '</div>',
      right: 0,
      top: $('header').outerHeight()
    });
  }
};