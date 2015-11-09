autocode.action.clean = function(opts) {
  opts = opts || {};
  
  if (opts.confirmed) {
    // close popup
    autocode.popup.close();
    
    // clean project
    autocode.ws.io.emit('clean', {
      config: autocode.project,
      project: autocode.repo.split('/')[1],
      user: autocode.repo.split('/')[0]
    });
    
    return;
  }
  
  // close popover
  autocode.popover.close();
  
  // open popup
  autocode.popup.open({
    title: 'Are you sure?',
    content: '<div style="padding-bottom: 20px">Cleaning your project means that all of your generated files will be destroyed and need to be regenerated.</div><button onclick="autocode.action.closePopup()">No, Nevermind</button> <button class="secondary" onclick="autocode.action.clean({ confirmed: true })">Yes, Do It</button>'
  });
};