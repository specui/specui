autocode.state['imports/remove'] = function(opts) {
  autocode.popup.open({
    title: 'Remove Import',
    content: '<div style="padding-bottom: 10px">Are you sure you want to remove the <b>' + autocode.data.current.import + '</b> import from this project?</div>'
      + '<a class="button" href="popup/close">No, Keep Import</a> <a class="button secondary" href="imports/remove/confirm">Yes, Remove Import</a>'
  });
};