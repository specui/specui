autocode.state['home'] = function() {
  $('#app').fadeOut(function() {
    $('#menu .text').text('Choose a Project');
    $('#welcome').fadeIn();
  });
};