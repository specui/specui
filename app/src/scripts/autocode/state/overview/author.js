autocode.state['overview/author'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  
  $('#overview-author-name .value').text(autocode.project.author.name || ' [ Click to Add ]');
  $('#overview-author-email .value').text(autocode.project.author.email || ' [ Click to Add ]');
  $('#overview-author-url .value').text(autocode.project.author.url || ' [ Click to Add ]');
  
  autocode.action.toggleSection('overview', 'author');
};