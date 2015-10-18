autocode.state['overview/author'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  
  $('#overview-author-name .value').text(autocode.project.author.name);
  $('#overview-author-email .value').text(autocode.project.author.email);
  $('#overview-author-url .value').text(autocode.project.author.url);
  
  autocode.action.toggleSection('overview', 'author');
};