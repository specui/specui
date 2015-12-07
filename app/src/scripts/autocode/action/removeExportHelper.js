autocode.action.removeExportHelper = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    autocode.popup.open({
      title: 'Remove Export Helper',
      content: '<div style="padding-bottom: 10px">Are you sure you want to remove the <b>' + opts.alias + '</b> helper from the <b>' + autocode.data.current.export + '</b> export?</div>'
        + '<button class="delete" onclick="autocode.action.removeExportHelper({ alias: \'' + opts.alias + '\', confirm: true })">Yes, Remove Helper</button> <button class="secondary" onclick="autocode.action.closePopup()">No, Keep Helper</button>'
    });
    return;
  }
  
  // delete helper
  delete(autocode.project.exports[autocode.data.current.export].helper[opts.alias]);
  
  // reload export
  autocode.action.loadExport({ repo: autocode.data.current.export });
  
  // close popup
  autocode.popup.close();
};