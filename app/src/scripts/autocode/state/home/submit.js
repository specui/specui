autocode.state['home/submit'] = function() {
  autocode.unload.disable();
  
  autocode.data.current = {};
  delete(autocode.project);
  
  autocode.popup.close();
  
  $('.app, #init').fadeOut(function() {
    $('#menu .text').text('Menu');
    $('#welcome').fadeIn();
  });
};