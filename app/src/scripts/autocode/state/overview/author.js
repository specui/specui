autocode.state['overview/author'] = function() {
  $('#overview-author-content input[name="name"]').val(autocode.project.author.name);
  $('#overview-author-content input[name="email"]').val(autocode.project.author.email);
  $('#overview-author-content input[name="url"]').val(autocode.project.author.url);
  $('#overview-author-content input[name="copyright"]').val(autocode.project.copyright);
  
  autocode.action.toggleSection('overview', 'author');
};