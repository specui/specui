autocode.state['imports/import'] = function() {
  autocode.popup.open({
    title: 'Loading Modules...'
  });
  
  autocode.api.modules.get({
    success: function(modules) {
      var rows = [];
      for (var i = 0; i < modules.length; i++) {
        rows.push({
          icon: 'https://cdn.rawgit.com/' + modules[i].name + '/master/.autocode/icon.svg',
          state: 'imports/add?repo=' + modules[i].name,
          text: modules[i].name
        });
      }
      
      autocode.popup.open({
        title: 'Import Modules',
        rows: rows,
        style: 'table'
      });
    }
  });
};