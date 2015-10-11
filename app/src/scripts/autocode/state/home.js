autocode.state['home'] = function() {
  $('#app, #init').fadeOut(function() {
    $('#menu .text').text('Choose a Project');
    $('#welcome').fadeIn();
  });
};