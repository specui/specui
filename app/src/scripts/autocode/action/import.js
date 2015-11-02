autocode.action.import = function() {
  autocode.popup.open({
    title: 'Loading Modules...'
  });
  
  autocode.api.modules.get({
    success: function(modules) {
      var rows = [];
      for (var i = 0; i < modules.length; i++) {
        rows.push({
          action: {
            name: 'addImport',
            data: {
              repo: modules[i].name
            }
          },
          icon: 'https://cdn.rawgit.com/' + modules[i].name + '/master/.autocode/icon.svg',
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