autocode.error = {
  add: function(msg) {
    var error = $(document.createElement('a'));
    error.on('click', function() {
      error.slideUp(function() {
        error.remove();
      });
    });
    error.hide();
    error.text(msg);
    $('#errors').append(error);
    error.slideDown();
    
    setTimeout(function() {
      error.slideUp(function() {
        error.remove();
      });
    }, 3000);
  }
};