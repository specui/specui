autocode.state['imports/add'] = function(opts) {
  $('#popup, #overlay').fadeOut(function() {
    autocode.popup.close();
    
    autocode.api.releases.get({
      data: {
        repo: opts.repo
      },
      success: function(data) {
        if (!autocode.project.imports) {
          autocode.project.imports = {};
        }
        
        autocode.project.imports[opts.repo] = '~' + data[0].substr(1);
        
        $('#imports-init').fadeOut(function() {
          $('#imports-content-container').fadeIn(function() {
            autocode.state['imports']();
          });
        });
      }
    });
  });
};