autocode.state['project/diff'] = function() {
  autocode.popup.open({
    title: 'Review Changes',
    content: '<div class="diff"></div><a class="button" href="project/save">Save Project</a> <a class="button secondary" href="popup/close">Close</a>'
  });
  
  CodeMirror.MergeView($('#popup .diff')[0], {
    value: jsyaml.safeDump(autocode.project),
    orig: autocode.data.originalConfig,
    lineNumbers: true,
    mode: 'yaml',
    readOnly: true,
    revertButtons: false
  });
};