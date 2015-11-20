autocode.action.removeExport = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Remove Export',
      content: '<div style="padding-bottom: 10px">Are you sure you want to remove the <b>' + autocode.data.current.export + '</b> export from this project?</div>'
        + '<button class="delete" onclick="autocode.action.removeExport({ confirm: true })">Yes, Remove Export</button> <button class="secondary" onclick="autocode.action.closePopup()">No, Keep Export</button>'
    });
    
    return;
  }
  
  autocode.popup.close();
  
  for (var generator_name in autocode.data.generators) {
    if (generator_name.split('.')[0] == autocode.data.current.export.split('/')[1]) {
      delete(autocode.data.generators[generator_name]);
    }
  }
  delete(autocode.project.exports[autocode.data.current.export]);
  delete(autocode.data.current.export);
  
  autocode.state['exports']();
};