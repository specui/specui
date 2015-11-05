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
      var rows = [], row_action;
      
      for (var i = 0; i < data.length; i++) {
        rows.push({
          action: {
            name: 'loadProject',
            data: {
              name: data[i].name
            }
          },
          icon: 'login-icon',
          text: data[i].name
        });
      }
      
      autocode.popup.open({
        rows: rows,
        style: 'table'
      });
    }
  });
};