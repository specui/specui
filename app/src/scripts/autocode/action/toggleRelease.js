autocode.action.toggleRelease = function() {
  var release, rows = [{
    action: 'newRelease',
    icon: 'add-icon black',
    text: 'New Release'
  },{
    action: {
      name: 'loadWorkingCopy',
      data: {
        name: 'working-copy'
      }
    },
    icon: 'working-copy-icon black',
    text: 'Working Copy'
  }], row_style = 'divider';
  for (var i in autocode.data.releases) {
    release = autocode.data.releases[i];
    rows.push({
      action: 'loadRelease',
      icon: 'release-icon black',
      style: row_style,
      text: release
    });
    row_style = null;
  }
  
  autocode.popover.toggle({
    rows: rows,
    left: $('#release').offset().left - 5,
    style: 'table',
    target: $('#release'),
    top: $('#main').outerHeight()
  });
  
  autocode.initState();
};