autocode.action.toggleSection = function(name, section) {
  $('.content, .tab').removeClass('selected');
  $('#' + name + '-content, #' + name + '-tab').addClass('selected');
  $('#' + name + '-' + section + '-content').addClass('selected');
};