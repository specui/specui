autocode.state['imports/module'] = function(opts) {
  $('#imports-content input[name="name"]').val(opts.repo);
  $('#imports-content input[name="version"]').val(autocode.project.imports[opts.repo]);
  $('#imports-content-readme').text('');
  
  autocode.api.readme.get({
    data: {
      repo: opts.repo
    },
    success: function(data) {
      var readme = marked(data.readme);
      readme = readme.replace(/<p><a(.*?)><img(.*?)><\/a><\/p>/, '');
      $('#imports-content-readme').html(readme);
    }
  });
};