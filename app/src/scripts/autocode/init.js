autocode.init = function() {
  autocode.api.url = autocode.url.api();
  autocode.resize.loader();
  $('#loader').animate({ opacity: 1 });
  
  autocode.console.init();
  autocode.editor.init();
  autocode.hint.init();
  autocode.shortcut.init()
  autocode.initState();
  
  $(window).bind({
    keyup: function(e) {
      if (e.keyCode == 9 || e.keyCode == 27) {
        autocode.fuzzy.close();
      }
    },
    mousedown: function(e) {
      var target = $(e.target);
      
      if (
        target.attr('id') != 'popover' && !target.parents('#popover').length
        && target.attr('id') != 'menu' && !target.parents('#menu').length
        && target.attr('id') != 'more-icon' && !target.parents('#more-icon').length
        && target.attr('id') != 'user' && !target.parents('#user').length
      ) {
        autocode.popover.close();
      }
      
      if (target.attr('id') != 'fuzzy' && !target.parents('#fuzzy').length) {
        autocode.fuzzy.close();
      }
    },
    popstate: function() {
      var hash = location.hash.split('#')[1];
      if (autocode.state[hash]) {
        autocode.state[hash]();
      }
    },
    scroll: function() {
      $(this).data('scrolled', true);
    }
  });
  
  $('#content .content-center').bind('scroll', function() {
    if ($('#fuzzy').length) {
      autocode.resize.fuzzy();
    }
    if ($('#hint').length) {
      autocode.resize.hint();
    }
  });
  
  $('#projects-content-form input').bind('keyup', function() {
    var projects = autocode.data.projects, value = $(this).val();
    
    $('#projects-content-results').empty();
    
    var project_element;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].name && projects[i].name.match(new RegExp(value, 'i'))) {
        project_element = $(document.createElement('a'));
        project_element.bind('click', function() {
          autocode.action.loadProject({
            confirm: true,
            name: $(this).data('name')
          });
        });
        project_element.data('name', projects[i].name);
        project_element.html(
          '<span class="image" style="background-image: url(' + autocode.url.api('icons/' + projects[i].name) + ')"></span>'
          + '<span class="text">' + projects[i].name + '</span>'
        );
        $('#projects-content-results').append(project_element);
      }
    }
    
    autocode.resize.projects();
  });
  
  var code = autocode.query.get('code');
  if (code) {
    history.pushState(null, null, '/');
    autocode.api.login.post({
      data: {
        code: code,
        provider: 1
      },
      error: function(data) {
        alert('Unable to login.');
        autocode.load();
      },
      success: autocode.load
    });
  } else {
    autocode.load();
  }
  
  autocode.resize.all();
};

$(window).load(autocode.init);