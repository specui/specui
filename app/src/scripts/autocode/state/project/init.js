autocode.state['project/init'] = function() {
  autocode.popup.open({
    title: 'Initializing Autocode...'
  });
  autocode.popover.close();
  
  autocode.api.init.post({
    data: {
      repo: autocode.repo
    },
    success: function(data) {
      var rows = [];
      
      for (var i = 0; i < data.length; i++) {
        rows.push({
          icon: 'login-icon',
          state: 'project/load/repo?name=' + data[i].name,
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