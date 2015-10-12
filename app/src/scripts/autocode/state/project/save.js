autocode.state['project/save'] = function() {
  if (!autocode.project) {
    return;
  }
  
  autocode.popover.close();
  
  if (autocode.data.current.tab == 'config') {
    var value = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(value);
  }
  
  if (jsyaml.safeDump(autocode.data.originalConfig) == jsyaml.safeDump(autocode.project)) {
    autocode.popup.open({
      title: 'No Changes',
      content: 'There are no changes to your Autocode configuration.'
    });
    return;
  }
  
  autocode.popup.open({
    title: 'Save Project',
    content: '<div>Review your Autocode Configuration changes below before committing/pushing them to GitHub:</div><div class="diff"></div><textarea name="message" placeholder="Your commit message"></textarea><a class="button" href="project/save/submit">Save Project</a>'
  });
  
  CodeMirror.MergeView($('#popup .diff')[0], {
    value: jsyaml.safeDump(autocode.project),
    orig: jsyaml.safeDump(autocode.data.originalConfig),
    showDifferences: true,
    lineNumbers: true,
    mode: 'yaml',
    readOnly: true,
    revertButtons: false
  });
};