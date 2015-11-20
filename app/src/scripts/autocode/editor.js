autocode.editor = {
  defaultEditor: 'codemirror',
  defaultTheme: 'dracula',
  codemirror: {
    themes: [
      '3024-day',
      '3024-night',
      'abcdef',
      'ambiance-mobile',
      'ambiance',
      'base16-dark',
      'base16-light',
      'blackboard',
      'cobalt',
      'colorforth',
      'dracula',
      'eclipse',
      'elegant',
      'erlang-dark',
      'icecoder',
      'lesser-dark',
      'liquibyte',
      'material',
      'mbo',
      'mdn-like',
      'midnight',
      'monokai',
      'neat',
      'neo',
      'night',
      'paraiso-dark',
      'paraiso-light',
      'pastel-on-dark',
      'rubyblue',
      'seti',
      'solarized',
      'the-matrix',
      'tomorrow-night-bright',
      'tomorrow-night-eighties',
      'ttcn',
      'twilight',
      'vibrant-ink',
      'xq-dark',
      'xq-light',
      'yeti',
      'zenburn'
    ]
  },
  getTheme: function() {
    var theme = autocode.storage.get('theme');
    if (!theme) {
      theme = autocode.editor.defaultTheme;
    }
    return theme;
  },
  init: function() {
    var theme = autocode.editor.getTheme();
    $('head').append('<link id="' + theme + '-theme" href="components/CodeMirror/theme/' + theme + '.css" rel="stylesheet" type="text/css" />');
  },
  lineNumbersEnabled: function() {
    var lineNumbers = autocode.storage.get('lineNumbers');
    return lineNumbers ? true : false;
  },
  setTheme: function(theme) {
    autocode.storage.set('theme', theme);
    if (!$('#' + theme + '-theme').length) {
      $('head').append('<link id="' + theme + '-theme" href="components/CodeMirror/theme/' + theme + '.css" rel="stylesheet" type="text/css" />');
    }
    $('.CodeMirror').each(function() {
      $(this)[0].CodeMirror.setOption('theme', theme);
    });
  }
};