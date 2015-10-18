autocode.loader = {
  close: function() {
    $('#loader').remove();
  },
  open: function(opts) {
    autocode.loader.close();
    
    var loader = $(document.createElement('div'));
    loader.attr('id', 'loader');
    loader.html('<img class="icon" src="images/loader.svg" />');
    $('body').append(loader);
    
    autocode.resize.all(['loader']);
    
    loader.animate({ opacity: 1 });
  }
};