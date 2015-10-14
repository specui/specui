autocode.state['tour'] = function() {
  var imports_click = function() {
    $(this).unbind('click', imports_click);
    
    autocode.hint.open({
      target: $('#imports-init a.button'),
      text: 'Select a module to import into your project.'
    });
    
    $('#imports-init a.button').click(imports_init_click);
    
    autocode.resize.hint();
  };
  
  var overview_click = function() {
    $(this).unbind('click', overview_click);
    
    $('#tour-content').hide();
    
    autocode.hint.open({
      target: $('#imports-tab'),
      text: 'Once done, click this tab to import modules.'
    });
    
    $('#imports-tab').click(imports_click);
    
    autocode.resize.hint();
  };
  $('#overview-tab').click(overview_click);
  
  var imports_init_click = function() {
    $(this).unbind('click', imports_click);
    
    autocode.hint.close();
    
    autocode.resize.hint();
  };
  
  $('#welcome').fadeOut(function() {
    $('#app').fadeIn();
    
    $('*[data-hint]').hide();
    
    autocode.imports = {};
    autocode.data.generators = {};
    
    autocode.project = {
      name: 'My App',
      description: 'My amazing new app.',
      url: 'https://example.org',
      author: {
        name: 'My Name',
        email: 'my.email@example.org',
        url: 'http//example.org/my-name',
        copyright: '2015 My Co.'
      }
    };
    autocode.data.originalConfig = {};
    
    //autocode.state['overview']();
    
    $('#tour-content').fadeIn();
    
    autocode.hint.open({
      target: $('#overview-tab'),
      text: 'Click here to fill out information about your project.'
    });
    
    autocode.resize.hint();
  });
};