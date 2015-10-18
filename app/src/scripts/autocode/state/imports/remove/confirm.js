autocode.state['imports/remove/confirm'] = function(opts) {
  autocode.popup.close();
  
  for (var generator_name in autocode.data.generators) {
    if (generator_name.split('.')[0] == autocode.data.current.import.split('/')[1]) {
      delete(autocode.data.generators[generator_name]);
    }
  }
  delete(autocode.project.imports[autocode.data.current.import]);
  
  autocode.state['imports']();
};