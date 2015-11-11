autocode.state['scripts'] = function() {
  $('#scripts-content-container').show();
  
  autocode.action.toggleSection('scripts');
  autocode.action.loadScript({ name: 'build' });
};