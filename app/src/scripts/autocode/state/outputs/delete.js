autocode.state['outputs/delete'] = function() {
  autocode.popup.open({
    title: 'Delete Output',
    content: 'Are you sure you want to delete this output? <a href="outputs/delete/submit">Delete Output</a>'
  });
};