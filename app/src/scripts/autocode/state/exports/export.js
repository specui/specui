autocode.state['exports/export'] = function(opts) {
  var exported = autocode.project.exports[opts.export];
  
  $('#exports-content input[name="name"]').val(opts.export);
  $('#exports-content input[name="description"]').val(exported.description);
  $('#exports-content input[name="type"]').val(exported.type);
  
  if (exported.type == 'generator') {
    $('#exports-content input[name="engine"]').val(exported.engine);
    $('#exports-content input[name="filename"]').val(exported.filename);
    $('#exports-content input[name="schema"]').val(exported.schema);
    
    $('#exports-content .engine-field, #exports-content .filename-field, #exports-content .schema-field').show();
    
    $('#exports-content textarea').val(exported.template);
    
  } else {
    $('#exports-content input[name="engine"]').val('');
    $('#exports-content input[name="filename"]').val('');
    $('#exports-content input[name="schema"]').val('');
    
    $('#exports-content .engine-field, #exports-content .filename-field, #exports-content .schema-field').hide();
    
    $('#exports-content textarea').val(exported.schema);
  }
  
  $('#exports-content form .button').attr('href', 'exports/export/save?export=' + opts.export);
  
  autocode.api.readme.get({
    data: {
      repo: opts.repo
    },
    success: function(data) {
      $('#exports-content-readme').html(marked(data.readme));
    }
  });
};