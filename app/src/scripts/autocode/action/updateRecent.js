autocode.action.updateRecent = function() {
  if (!autocode.data.user) {
    return;
  }
  
  var recent_projects = autocode.storage.get('recent', []).reverse();
  if (recent_projects.length) {
    var html = '';
    for (var i = 0; i < recent_projects.length; i++) {
      html += '<a href="' + recent_projects[i] + '">' + recent_projects[i] + '</a>';
    }
    $('#welcome .recent .projects').html(html);
    
    $('#welcome .recent').show();
    
    autocode.initState();
    
  } else {
    $('#welcome .recent').hide();
  }
};