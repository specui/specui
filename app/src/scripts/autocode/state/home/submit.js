autocode.state['home/submit'] = function() {
  delete(autocode.project);
  
  autocode.popup.close();
  
  $('#app, #init').fadeOut(function() {
    $('#menu .text').text('Menu');
    $('#welcome').fadeIn();
  });
};