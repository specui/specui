autocode.state['outputs/delete/submit'] = function() {
  autocode.project.outputs.splice(autocode.output, 1);

  delete(autocode.output);

  autocode.popup.close();

  autocode.state['outputs']();
};