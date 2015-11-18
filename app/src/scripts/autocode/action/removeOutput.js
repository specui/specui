autocode.action.removeOutput = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Delete Output',
      content: 'Are you sure you want to delete this output? <button onclick="autocode.action.removeOutput({ confirm: true })">Delete Output</button>'
    });
    return;
  }
  
  autocode.project.outputs.splice(autocode.data.current.output, 1);

  delete(autocode.data.current.output);

  autocode.popup.close();

  autocode.state['outputs']({ output: autocode.object.firstKey(autocode.project.outputs) });
};