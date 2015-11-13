autocode.action.commitProject = function(opts) {
  opts = opts || {};
  
  if (!autocode.project) {
    return;
  }

  autocode.popover.close();
  
  if (opts.confirm) {
    var data = {
      config: autocode.project,
      message: $('#popup textarea[name="message"]').val(),
      repo: autocode.repo
    };
    
    autocode.popup.open({
      title: 'Saving Project...'
    });
    autocode.popover.close();
    
    autocode.api.config.post({
      data: data,
      error: function(data) {
        autocode.popup.open({
          title: 'Unable to Commit Project',
          content: 'Please try again or contact us at <a href="mailto:support@autocode.run">support@autocode.run</a>.'
        });
      },
      success: function(data) {
        autocode.data.originalConfig = jsyaml.safeDump(autocode.project);
        autocode.popup.close();
      }
    });
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
    title: 'Commit Project',
    content: '<div>Review your Autocode Configuration changes below before committing/pushing them to GitHub:</div><div class="diff"></div><textarea name="message" placeholder="Your commit message"></textarea><button onclick="autocode.action.commitProject({ confirm: true })">Commit Project</button>'
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