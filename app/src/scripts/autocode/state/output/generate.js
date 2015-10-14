autocode.state['output/generate'] = function() {
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