autocode.state['overview/general'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  autocode.action.toggleSection('overview', 'general');
  
  $('#overview-general-content input[name="name"]').val(autocode.project.name);
  $('#overview-general-content textarea[name="description"]').val(autocode.project.description);
  $('#overview-general-content input[name="url"]').val(autocode.project.url);
};