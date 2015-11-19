autocode.action.reset = function(opts) {
  opts = opts || {};
  
  if (!autocode.project) {
    return;
  }

  autocode.popover.close();
  
  if (opts.confirm) {
    autocode.project = jsyaml.safeLoad(autocode.data.originalConfig);
    if (autocode.data.current.tab == 'config') {
      $('#config-content .CodeMirror')[0].CodeMirror.setValue(autocode.data.originalConfig);
    }
    autocode.popup.close();
    
    return;
  }
  
  if (autocode.data.current.tab == 'config') {
    var value = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
    autocode.project = jsyaml.safeLoad(value);
  }

  if (autocode.data.originalConfig == jsyaml.safeDump(autocode.project)) {
    autocode.popup.open({
      title: 'No Changes',
      content: 'There are no changes to your Autocode configuration.'
    });
    return;
  }

  var output;
  for (var output_i in autocode.project.outputs) {
    output = autocode.project.outputs[output_i];
    
    if (!autocode.data.generators[output.generator]) {
      autocode.popup.open({
        title: 'Validation Error',
        content: 'Generator does not exist for output: <b>' + output.generator + '</b>'
      });
      return;
    }
  }

  autocode.popup.open({
    title: 'Reset Project',
    content: '<div>Are you sure you want to discard all changes? <a href="#">Show Changes</a></div><div class="diff"></div><button onclick="autocode.action.reset({ confirm: true })">Reset Project</button>'
  });

  CodeMirror.MergeView($('#popup .diff')[0], {
    value: jsyaml.safeDump(autocode.project),
    orig: autocode.data.originalConfig,
    showDifferences: true,
    lineNumbers: true,
    mode: 'yaml',
    readOnly: true,
    revertButtons: false
  });
  
  autocode.resize.popup();
};