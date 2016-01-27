autocode.resize = {
  all: function(resize) {
    if (typeof(resize) == 'string') {
      resize = [resize];
    }
    
    var parts = [
      'body',
      'codePreview',
      'content',
      'config',
      'exports',
      'exportsInit',
      'footer',
      'header',
      'hint',
      'icon',
      'init',
      'interfacesInit',
      'loader',
      'output',
      'outputs',
      'outputInit',
      'outputsInit',
      'overlay',
      'popup',
      'projects',
      'fuzzy',
      'versionsInit',
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