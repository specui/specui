autocode.state['exports/export/save'] = function(opts) {
  if ($('#exports-content input[name="name"]').val() != opts.export) {
    var export_name = $('#exports-content input[name="name"]').val();
    autocode.project.exports[export_name] = JSON.parse(JSON.stringify(autocode.project.exports[opts.export]));
    delete(autocode.project.exports[opts.export]);
  } else {
    var export_name = opts.export;
  }
  
  //autocode.project.exports[opts.export].filename = $('#exports-content input[name="filename"]').val();
  autocode.project.exports[export_name].description = $('#exports-content input[name="description"]').val();
  autocode.project.exports[export_name].type = $('#exports-content input[name="type"]').val();
  if (autocode.project.exports[export_name].type == 'generator' && $('#exports-content input[name="filename"]').val().length) {
    autocode.project.exports[export_name].filename = $('#exports-content input[name="filename"]').val();
  } else {
    delete(autocode.project.exports[export_name].filename);
  }
  
  autocode.state['project/save']();
};