autocode.state['github/user'] = function() {
  autocode.popover.close();
  
  window.open('https://github.com/' + autocode.data.user.username);
};