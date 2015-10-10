autocode.state['imports/module'] = function(opts) {
  $('#imports-content input[name="name"]').val(opts.repo);
  $('#imports-content input[name="version"]').val(autocode.project.imports[opts.repo]);
  
  autocode.api.readme.get({
    data: {
      repo: opts.repo
    },
    success: function(data) {
      $('#imports-content-readme').html(marked(data.readme));
    }
  });
};