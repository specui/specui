autocode.action.toggleSection = function(name, section) {
  if (autocode.data.current.tab == 'config') {
    var value = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(value);
  }
  
  autocode.data.current.tab = name;
  autocode.data.current.subtab = section;
  
  $('.content, .tab').removeClass('selected');
  $('#' + name + '-content, #' + name + '-tab').addClass('selected');
  if (section) {
    $('.subcontent').removeClass('selected');
    $('#' + name + '-' + section + '-content').addClass('selected');
    $('#' + name + '-content .subtab').removeClass('selected');
    $('#' + name + '-' + section + '-subtab').addClass('selected');
  }
};