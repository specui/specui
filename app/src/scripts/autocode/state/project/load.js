autocode.state['project/load'] = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  autocode.api.repos.get({
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
        title: 'Load Project',
        rows: rows,
        style: 'table'
      });
    }
  });
};