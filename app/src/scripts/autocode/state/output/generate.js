autocode.state['output/generate'] = function() {
  autocode.api.generate.post({
    data: autocode.project,
    error: function(data) {
      console.log(data);
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