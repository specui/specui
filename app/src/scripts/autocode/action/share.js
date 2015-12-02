autocode.action.share = function() {
  if (autocode.data.current.tab == 'config') {
    autocode.project = jsyaml.safeLoad($('#config-content .CodeMirror')[0].CodeMirror.getValue());
  }
  
  var value = jsyaml.safeDump(autocode.project);
  value = btoa(value);
  
  autocode.popup.open({
    title: 'Share Configuration',
    content: '<input id="popup-copy-target" type="text" value="' + location.protocol + '//' + location.host + '/' + autocode.repo + '" /><button class="copy-button" data-clipboard-target="popup-copy-target">Copy</button> <button class="secondary" onclick="autocode.action.closePopup()">Close</button>'
  });
  
  var client = new ZeroClipboard($('.copy-button')[0]);
};