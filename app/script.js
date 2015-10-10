var autocode = {
  action: {},
  api: {
    url: 'http://alpha.api.crystal.sh:3000',
    ajax: function(opts) {
      opts.url = autocode.api.url + '/' + opts.uri;
      
      $.ajax({
        method: opts.method,
        url: opts.url,
        error: opts.error,
        success: opts.success
      });
    },
    get: function(opts) {
      opts.method = 'get';
      return autocode.api.ajax(opts);
    }
  },
  state: {},
  initState: function() {
    $('a').each(function() {
      if ($(this).data('state')) {
        return;
      }
      
      $(this).data('state', true);
      
      $(this).click(autocode.initStateCallback);
    });
  },
  initStateCallback: function() {
    var href = $(this).attr('href');
    var action = autocode.state[href];
    
    if (action) {
      action();
      autocode.initState();
    }
    
    return false;
  },
  init: function() {
    autocode.initState();
    
    autocode.api.config.get({
      error: function(data) {
        console.log(data);
        alert('Unable to load. Please contact support.');
      },
      success: function(data) {
        var config = jsyaml.safeLoad(data.config);
        console.log(config.exports.ConfigSchematic);
        $('#loader').fadeOut(function() {
          $('#loader').remove();
          $('#container').fadeIn();
        });
      }
    });
    
    autocode.state['overview']();
    
    autocode.resize();
  },
  popover: {
    show: function(opts) {
      var popover = $(document.createElement('div'));
      popover.attr('id', 'popover');
      if (opts.bottom !== undefined) {
        popover.css('bottom', opts.bottom);
      }
      if (opts.left !== undefined) {
        popover.css('left', opts.left);
      }
      if (opts.right !== undefined) {
        popover.css('right', opts.right);
      }
      if (opts.top !== undefined) {
        popover.css('top', opts.top);
      }
      popover.html(opts.content);
      $('body').append(popover);
    },
    toggle: function(opts) {
      if ($('#popover').length) {
        $('#popover').remove();
      } else {
        autocode.popover.show(opts);
      }
    }
  },
  resize: function() {
    $('#content').css({
      height: $(window).height() - $('header').outerHeight() - $('#tabs').outerHeight()
    });
    $('.content-center').css({
      width: $(window).width() - $('.content-left').outerWidth() - $('.content-right').outerWidth()
    });
    
    var loader = $('#loader');
    loader.css({
      left: ($(window).width() - loader.outerWidth()) / 2,
      top: ($(window).height() - loader.outerHeight()) / 2
    });
  }
};

autocode.api.config = {
  uri: 'config?repo=crystal/autocode&provider=1',
  init: function(opts) {
    opts.uri = autocode.api.config.uri;
    return opts;
  },
  get: function(opts) {
    opts = autocode.api.config.init(opts);
    return autocode.api.get(opts);
  }
};

autocode.action.toggleSection = function(name, section) {
  $('.content, .tab').removeClass('selected');
  $('#' + name + '-content, #' + name + '-tab').addClass('selected');
  $('#' + name + '-' + section + '-content').addClass('selected');
};

autocode.state['exports'] = function() {
  autocode.action.toggleSection('exports');
};

autocode.state['imports'] = function() {
  autocode.action.toggleSection('imports');
};

autocode.state['outputs'] = function() {
  autocode.action.toggleSection('outputs');
};

autocode.state['overview'] = function() {
  autocode.action.toggleSection('overview');
};

autocode.state['overview/author'] = function() {
  autocode.action.toggleSection('overview', 'author');
};

autocode.state['overview/general'] = function() {
  autocode.action.toggleSection('overview', 'general');
};

autocode.state['user'] = function() {
  autocode.popover.toggle({
    content:
      '<div class="table">'
        + '<a href="user/profile"><span class="name">Edit Profile</span></a>'
        + '<a href="user/settings"><span class="name">Settings</span></a>'
        + '<a href="user/logout"><span class="name">Logout</span></a>'
      + '</div>',
    right: 0,
    top: $('header').outerHeight()
  });
};

$(window).load(autocode.init);
$(window).resize(autocode.resize);