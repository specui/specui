autocode.state['output/generate'] = function() {
  if (!autocode.project.outputs || !autocode.project.imports) {
    if (!autocode.project.imports) {
      autocode.popup.open({
        title: 'Unable to Generate Code',
        content: '<div style="padding-bottom: 10px">You haven\'t imported any modules yet.</div>'
          + '<a class="button" href="imports">Import a Module</a> <a class="button secondary" href="popup/close">Cancel</a>'
      });
    } else {
      autocode.popup.open({
        title: 'Unable to Generate Code',
        content: '<div style="padding-bottom: 10px">You haven\'t added any outputs to your Autocode configuration.</div>'
          + '<a class="button" href="config">Add an Output</a> <a class="button secondary" href="popup/close">Cancel</a>'
      });
    }
    
    return;
  }
  
  $('span span.icon.loader-icon').addClass('loading');
  
  autocode.api.generate.post({
    data: autocode.project,
    complete: function() {
      $('span span.icon.loader-icon').removeClass('loading');
    },
    error: function(data) {
      alert('Unable to generate code.');
    },
    success: function(data) {
      autocode.data.output = data;
      
      $('#output-init').fadeOut(function() {
        $('#output-content-container').fadeIn(function() {
          autocode.state['output']();
        });
      });
    }
  });
};