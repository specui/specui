autocode.action.removeImport = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Remove Import',
      content: '<div style="padding-bottom: 10px">Are you sure you want to remove the <b>' + autocode.data.current.import + '</b> import from this project?</div>'
        + '<button onclick="autocode.action.closePopup()">No, Keep Import</button> <button class="secondary" onclick="autocode.action.removeImport({ confirm: true })">Yes, Remove Import</button>'
    });
    
    return;
  }
  
  autocode.popup.close();
  
  for (var generator_name in autocode.data.generators) {
    if (generator_name.split('.')[0] == autocode.data.current.import.split('/')[1]) {
      delete(autocode.data.generators[generator_name]);
    }
  }
  delete(autocode.project.imports[autocode.data.current.import]);
  
  autocode.state['imports']();
};