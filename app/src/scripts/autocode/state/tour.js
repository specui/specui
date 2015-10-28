autocode.state['tour'] = function() {
  autocode.popover.close();
  
  var click_event = navigator.userAgent.match(/mobile/i) ? 'touchend' : 'click';
  var hint_offset_top = -10;
  
  var imports_click = function() {
    $(this).unbind(click_event, imports_click);
    
    autocode.hint.open({
      target: $('#imports-search'),
      text: 'Select a module to import into your project. For example, try typing "bower".'
    });
    
    $('#imports-search').keyup(imports_init_click);
    
    autocode.listener.add('import_listener', 'imports/add', function() {
      module_click();
    });
    
    autocode.resize.hint();
    
    $('#imports-search').focus();
  };
  
  var overview_click = function() {
    $(this).unbind(click_event, overview_click);
    
    $('#tour-content').hide();
    
    autocode.hint.open({
      minTop: 0,
      offsetTop: -10,
      target: $('#imports-tab'),
      text: 'Once done, click this tab to import modules.'
    });
    
    $('#imports-tab').bind(click_event, imports_click);
    
    autocode.resize.hint();
  };
  $('#overview-tab').bind(click_event, overview_click);
  
  var imports_init_click = function() {
    $(this).unbind('keyup', imports_init_click);
    
    autocode.hint.close();
    
    setTimeout(function() {
      $('#popup a').bind(click_event, module_click);
      
      autocode.resize.hint();
    }, 1000);
  };
  
  var check_hint;
  var module_click = function() {
    autocode.listener.remove('import_listener');
    
    check_hint = setInterval(function() {
      if ($('#imports-content-readme button').length) {
        autocode.hint.open({
          scrollUp: 'Scroll back up to click the button',
          target: function() {
            return $('#imports-content-readme button');
          },
          text: 'Click here to add an example from this module to your Autocode configuration.'
        });
        
        $('#imports-content-readme button').bind('click', example_click);

        autocode.resize.hint();
      } else {
        autocode.hint.close({ animated: false });
      }
    }, 100);
  };
  
  var example_click = function() {
    clearInterval(check_hint);
    
    $(this).unbind('click', example_click);
    
    autocode.hint.open({
      offsetTop: hint_offset_top,
      target: $('#output-tab'),
      text: 'Great! Now let\'s generate some code.',
      top: $('header').outerHeight()
    });
    
    $('#output-tab').bind(click_event, generate_click);
    
    autocode.resize.hint();
  };
  
  var generate_click = function() {
    $(this).unbind(click_event, generate_click);
    
    autocode.hint.open({
      target: $('#user'),
      text: 'Woohoo! You used Autocode to generate code! Now login with GitHub to signup :)',
      top: 52
    });
    
    setTimeout(function() {
      autocode.hint.close();
    }, 10000);
    
    autocode.resize.hint();
  };
  
  $('#welcome').fadeOut(function() {
    $('.app').fadeIn();
    
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
    autocode.data.originalConfig = '';
    
    //autocode.state['overview']();
    
    $('#tour-content').fadeIn();
    
    autocode.hint.open({
      offsetTop: -10,
      minTop: 0,
      target: $('#overview-tab'),
      text: 'Click here to fill out information about your project.'
    });
    
    autocode.resize.hint();
  });
};