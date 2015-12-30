autocode.action.reset = function(opts) {
  opts = opts || {};
  
  if (!autocode.project) {
    return;
  }

  autocode.popover.close();
  
  if (opts.confirm) {
    // remove project from local storage
    var config = autocode.storage.get('config');
    if (!config || typeof(config) != 'object') {
      config = {};
    }
    delete(config[autocode.repo]);
    autocode.storage.set('config', config);
    
    var icon = autocode.storage.get('icon');
    if (icon && icon[autocode.repo]) {
      delete(icon[autocode.repo]);
      autocode.storage.set('icon', icon);
    }
    delete(autocode.icon);
    
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

  if (autocode.data.originalConfig == jsyaml.safeDump(autocode.project) && !autocode.icon) {
    autocode.popup.open({
      title: 'No Changes',
      content: 'There are no changes to your Autocode configuration.'
    });
    return;
  }
  
  autocode.popup.open({
    title: 'Reset Project',
    content: '<div>Are you sure you want to discard all changes? <a href="#">Show Changes</a></div><div class="diff"></div><button class="delete" onclick="autocode.action.reset({ confirm: true })">Reset Project</button> <button class="secondary" onclick="autocode.action.closePopup()">Cancel</button>'
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