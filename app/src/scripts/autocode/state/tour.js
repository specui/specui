autocode.state['tour'] = function() {
  autocode.popover.close();
  
  var imports_click = function() {
    $(this).unbind('click', imports_click);
    
    autocode.hint.open({
      target: $('#imports-search'),
      text: 'Select a module to import into your project. For example, try typing "bower".'
    });
    
    $('#imports-search').keyup(imports_init_click);
    
    autocode.listener.add('import_listener', 'imports/add', function() {
      module_click();
    });
    
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
    $(this).unbind('click', imports_init_click);
    
    autocode.hint.close();
    
    setTimeout(function() {
      $('#popup a').click(module_click);
      
      autocode.resize.hint();
    }, 1000);
  };
  
  var check_hint;
  var module_click = function() {
    autocode.listener.remove('import_listener');
    
    check_hint = setInterval(function() {
      if ($('#imports-content-readme button').length) {
        clearInterval(check_hint);
        
        autocode.hint.open({
          target: $('#imports-content-readme button'),
          text: 'Click here to add an example from this module to your Autocode configuration.'
        });
        
        $('#imports-content-readme button').click(example_click);

        autocode.resize.hint();

        return;
      }
    }, 100);
  };
  
  var example_click = function() {
    $(this).unbind('click', example_click);
    
    autocode.hint.open({
      target: $('#output-tab'),
      text: 'Great! Now let\'s generate some code.'
    });
    
    $('#output-tab').click(output_click);
    
    autocode.resize.hint();
  };
  
  var output_click = function() {
    $(this).unbind('click', output_click);
    
    autocode.hint.open({
      target: $('#output-init a.button'),
      text: 'One more time.'
    });
    
    $('#output-init a.button').click(generate_click);
    
    autocode.resize.hint();
  };
  
  var generate_click = function() {
    $(this).unbind('click', output_click);
    
    autocode.hint.open({
      target: $('#user'),
      text: 'Woohoo! You used Autocode to generate code! Now login with GitHub to signup :)'
    });
    
    setTimeout(function() {
      autocode.hint.close();
    }, 10000);
    
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