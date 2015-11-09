autocode.file = {
  extensions: {
    bowerrc: 'json',
    coffee: 'coffeescript',
    dockerfile: 'docker',
    dockerignore: 'docker',
    eslintrc: 'eslint',
    gitignore: 'git',
    gitkeep: 'git',
    htm: 'html',
    html: 'html',
    js: 'js',
    jshintrc: 'json',
    json: 'json',
    md: 'markdown',
    npmignore: 'npm',
    yml: 'yaml',
    yaml: 'yaml'
  },
  icon: function(filename) {
    var extension = filename.split('.');
    if (extension.length == 1) {
      extension = extension[0];
    } else {
      extension = extension[extension.length-1];
    }
    extension = extension.toLowerCase();
    
    var icon = 'file';
    if (autocode.file.extensions[extension]) {
      icon = autocode.file.extensions[extension];
    }
    
    return icon;
  }
};