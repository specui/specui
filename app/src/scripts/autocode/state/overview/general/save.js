autocode.state['overview/general/save'] = function() {
  autocode.project.name = $('#overview-general-content input[name="name"]').val();
  autocode.project.description = $('#overview-general-content textarea[name="description"]').val();
  autocode.project.url = $('#overview-general-content input[name="url"]').val();
  
  autocode.state['project/save']();
};