autocode.state['overview/general'] = function() {
  autocode.action.toggleColumn('overview-content', 2);
  autocode.action.toggleSection('overview', 'general');
  
  $('#overview-general-name .value').text(autocode.project.name || '[ Click to Add ]');
  $('#overview-general-version .value').text(autocode.project.version || '[ Click to Add ]');
  $('#overview-general-description .value').html(autocode.project.description ? marked(autocode.project.description) : '[ Click to Add ]');
  $('#overview-general-url .value').html(
    autocode.project.url
    ? '<a href="' + autocode.project.url + '">' + autocode.project.url + '</a>'
    : '[ Click to Add ]'
  );
  $('#overview-general-company .value').text(autocode.project.company || '[ Click to Add ]');
  $('#overview-general-license .value').text(autocode.project.license || '[ Click to Add ]');
  $('#overview-general-copyright .value').text(autocode.project.copyright || ' [ Click to Add ]');
};