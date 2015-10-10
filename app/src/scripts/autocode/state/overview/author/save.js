autocode.state['overview/author/save'] = function() {
  if (!autocode.project.author) {
    autocode.project.author = {};
  }
  
  autocode.project.author.name = $('#overview-author-content input[name="name"]').val();
  autocode.project.author.email = $('#overview-author-content input[name="email"]').val();
  autocode.project.author.url = $('#overview-author-content input[name="url"]').val();
  autocode.project.copyright = $('#overview-author-content input[name="copyright"]').val();
  
  autocode.state['project/save']();
};