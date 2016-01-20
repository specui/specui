autocode.state['overview/author'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  
  var authorName = ' [ Click to Add ]';
  if (autocode.project.author && autocode.project.author.name) {
    authorName = autocode.project.author.name;
  }
  var authorEmail = ' [ Click to Add ]';
  if (autocode.project.author && autocode.project.author.email) {
    authorEmail = autocode.project.author.email;
  }
  var authorURL = ' [ Click to Add ]';
  if (autocode.project.author && autocode.project.author.url) {
    authorURL = autocode.project.author.url;
  }
  
  $('#overview-author-name .value').text(authorName);
  $('#overview-author-email .value').text(authorEmail);
  $('#overview-author-url .value').text(authorURL);
  
  autocode.action.toggleSection('overview', 'author');
};