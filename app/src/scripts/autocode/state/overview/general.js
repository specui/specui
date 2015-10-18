autocode.state['overview/general'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  autocode.action.toggleSection('overview', 'general');
  
  $('#overview-general-name .value').text(autocode.project.name || '[ Click to Add ]');
  $('#overview-general-description .value').html(marked(autocode.project.description) || '[ Click to Add ]');
  $('#overview-general-url .value').html(
    autocode.project.url
    ? '<a href="' + autocode.project.url + '">' + autocode.project.url + '</a>'
    : '[ Click to Add ]'
  );
  $('#overview-general-copyright .value').text(autocode.project.copyright || ' [ Click to Add ]');
};