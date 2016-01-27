autocode.state['versions'] = function() {
  autocode.api.commits.get({
    data: {
      repo: opts.name
    },
    success: function(data) {
      console.log(data);
    }
  });
  
  return;
  
  //if (autocode.project.versions) {
    $('#versions-content-container .table a').slice(1).remove();
    
    var version_data, version_name;
    for (var version_i in autocode.project.versions) {
      version_data = autocode.project.versions[version_i];
      version_name = version_data.name;
      
      if (typeof(version_name) == 'string' && version_name.substr(0, 1) == '$' && autocode.project[version_name.substr(1)]) {
        version_name = autocode.project[version_name.substr(1)];
      }
      
      $('#versions-content-container .table').append(
        '<a class="file" id="versions-' + version_i + '" onclick="autocode.action.loadInterface({ index: \'' + version_i + '\' })">'
          + '<span class="image">'
            + '<span class="icon version-icon"></span>'
          + '</span>'
          + '<span class="info">'
            + '<span class="name">' + version_name + '</span>'
          + '</span>'
        + '</a>'
      );
    }
    
    $('#versions-init').hide();
    $('#versions-content-container').show();
    
    $('#versions-content-container .table a').eq(1).click();
    
    $('#versions-port .value').text(version_data.port || ' [ Click to Add ] ');
  
  /*
  } else {
    $('#versions-init').show();
    $('#versions-content-container').hide();
  }
  */
  
  autocode.initState()
  
  autocode.action.toggleSection('versions');
};