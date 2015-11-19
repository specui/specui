autocode.action.removeInterface = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Remove Interface',
      content: '<div style="padding-bottom: 10px">Are you sure you want to remove the <b>' + autocode.project.interfaces[autocode.data.current.interface].name + '</b> interface from this project?</div>'
        + '<button onclick="autocode.action.closePopup()">No, Keep Interface</button> <button class="secondary" onclick="autocode.action.removeInterface({ confirm: true })">Yes, Remove Interface</button>'
    });
    
    return;
  }
  
  autocode.popup.close();
  
  autocode.project.interfaces.splice(autocode.data.current.interface, 1);
  delete(autocode.data.current.interface);
  if (!autocode.project.interfaces.length) {
    delete(autocode.project.interfaces);
  }
  
  autocode.state['interfaces']();
};