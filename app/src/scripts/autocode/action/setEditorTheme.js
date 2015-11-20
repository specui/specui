autocode.action.setEditorTheme = function(opts) {
  var theme = opts.name.toLowerCase();
  
  $('#popup input[name="theme"]').val(theme);
  
  if (!$('#' + theme + '-theme').length) {
    $('head').append('<link id="' + theme + '-theme" href="components/CodeMirror/theme/' + theme + '.css" rel="stylesheet" type="text/css" />');
  }
  $('#popup .CodeMirror')[0].CodeMirror.setOption('theme', theme);

  autocode.fuzzy.close();
  
  autocode.resize.popup();
};