autocode.state['overview/general'] = function() {
  $('#overview-general-content input[name="name"]').val(autocode.project.name);
  $('#overview-general-content textarea[name="description"]').val(autocode.project.description);
  $('#overview-general-content input[name="url"]').val(autocode.project.url);
  
  autocode.action.toggleSection('overview', 'general');
};