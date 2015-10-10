autocode.state['user'] = function() {
  if (autocode.user.isLoggedIn) {
    autocode.popover.toggle({
      content:
        '<div class="table">'
          + '<a href="user/profile"><span class="name">Edit Profile</span></a>'
          + '<a href="user/settings"><span class="name">Settings</span></a>'
          + '<a href="user/logout"><span class="name">Logout</span></a>'
        + '</div>',
      right: 0,
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