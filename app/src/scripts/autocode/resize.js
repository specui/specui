autocode.resize = {
  all: function(resize) {
    if (typeof(resize) == 'string') {
      resize = [resize];
    }
    
    var parts = [
      'body',
      'content',
      'config',
      'exports',
      'exportsInit',
      'footer',
      'header',
      'hint',
      'init',
      'interfacesInit',
      'loader',
      'output',
      'outputs',
      'outputInit',
      'outputsInit',
      'overlay',
      'popup',
      'fuzzy',
      'welcome'
    ];
    
    var part;
    for (var i = 0; i < parts.length; i++) {
      part = parts[i];
      if (resize && resize.indexOf(part) === -1) {
        continue;
      }
      autocode.resize[part]();
    }
  }
};

$(window).resize(function() { autocode.resize.all(); });