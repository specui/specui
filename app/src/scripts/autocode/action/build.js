autocode.action.build = function() {
  if (!autocode.project.outputs || !autocode.project.imports) {
    if (!autocode.project.imports) {
      autocode.popup.open({
        title: 'Unable to Generate Code',
        content: '<div style="padding-bottom: 10px">You haven\'t imported any modules yet.</div>'
          + '<a class="button" href="imports">Import a Module</a> <button class="secondary" onclick="autocode.action.closePopup()">Cancel</button>'
      });
    } else {
      autocode.popup.open({
        title: 'Unable to Generate Code',
        content: '<div style="padding-bottom: 10px">You haven\'t added any outputs to your Autocode configuration.</div>'
          + '<a class="button" href="config">Add an Output</a> <button class="secondary" onclick="autocode.action.closePopup()">Cancel</button>'
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
      if (data.errors) {
        var content = '<ul>';
        for (var i = 0; i < data.errors.length; i++) {
          content += '<li>' + data.errors[i].message + (data.errors[i].context ? ' (in <b>' + data.errors[i].context.substr(2) + '</b>)' : '') + '</li>';
        }
        content += '</ul>';
        
        autocode.popup.open({
          title: 'Autocode Configuration Failed Validation',
          content: content
        });
      } else {
        autocode.popup.open({
          title: 'Unable to Generate Code'
        });
      }
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