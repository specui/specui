autocode.bootstrap = function() {
  // resize everything
  autocode.resize.all();
  
  // show container
  $('#container').animate({ opacity: 1 });
  
  // update user avatar
  var avatar = autocode.storage.get('avatar');
  if (avatar) {
    $('#login-option .user-icon').css('background-image', 'url(' + avatar + ')');
  } else {
    $('#login-option .user-icon').addClass('guest-icon');
  }
};