autocode.action.githubUser = function() {
  autocode.popover.close();
  
  window.open('https://github.com/' + autocode.data.user.username);
};