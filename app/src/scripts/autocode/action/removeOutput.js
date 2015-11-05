autocode.action.removeOutput = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Delete Output',
      content: 'Are you sure you want to delete this output? <button onclick="autocode.action.removeOutput({ confirm: true })">Delete Output</button>'
    });
    return;
  }
  
  autocode.project.outputs.splice(autocode.output, 1);

  delete(autocode.output);

  autocode.popup.close();

  autocode.state['outputs']();
};