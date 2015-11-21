autocode.action.newRelease = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      repo: autocode.repo
    },
    formula: 'formulas/forms/NewRelease.json',
    xhr: true,
    ready: function(form) {
      form.action = autocode.url.api('releases');
      autocode.popup.open({
        title: 'New Release',
        content: form.toString()
      });
    },
    success: function(data) {
      autocode.popup.close();
      
      // add release
      autocode.data.releases.push(data);
      
      // sort releases
      autocode.data.releases.sort();
      autocode.data.releases.reverse();
    }
  });
};