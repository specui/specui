autocode.action.diff = function() {
  autocode.popup.open({
    title: 'Review Changes',
    content: '<div class="diff"></div><a class="button" href="project/save">Save Project</a> <button class="secondary" onclick="autocode.action.closePopup()">Close</button>'
  });
  
  CodeMirror.MergeView($('#popup .diff')[0], {
    value: jsyaml.safeDump(autocode.project),
    orig: autocode.data.originalConfig,
    lineNumbers: true,
    mode: 'yaml',
    readOnly: true,
    revertButtons: false
  });
  
  autocode.resize.popup();
};