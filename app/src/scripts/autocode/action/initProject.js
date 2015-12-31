autocode.action.initProject = function() {
  autocode.popup.open({
    title: 'Initializing Autocode...'
  });
  autocode.popover.close();
  
  autocode.api.init.post({
    data: {
      repo: autocode.repo
    },
    success: function(data) {
      autocode.action.loadProject({ confirm: true, name: autocode.repo });
    }
  });
};