autocode.state['exports/export'] = function(opts) {
  var exported = autocode.project.exports[opts.export];
  
  $('#exports-content input[name="name"]').val(opts.export);
  $('#exports-content input[name="description"]').val(exported.description);
  $('#exports-content input[name="type"]').val(exported.type);
  
  var mode = 'yaml';
  var value;
  if (exported.type == 'generator') {
    mode = exported.format || 'text';
    
    $('#exports-content input[name="engine"]').val(exported.engine);
    $('#exports-content input[name="filename"]').val(exported.filename);
    $('#exports-content input[name="schema"]').val(exported.schema);
    $('#exports-content input[name="format"]').val(mode);
    
    $('#exports-content .engine-field, #exports-content .filename-field, #exports-content .format-field, #exports-content .schema-field').show();
    
    value = exported.template;
    
  } else {
    $('#exports-content input[name="engine"]').val('');
    $('#exports-content input[name="filename"]').val('');
    $('#exports-content input[name="schema"]').val('');
    
    $('#exports-content .engine-field, #exports-content .filename-field, #exports-content .format-field, #exports-content .schema-field').hide();
    
    value = jsyaml.safeDump(exported.schema);
  }
  
  var code_mirror = $('#exports-content .CodeMirror');
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#exports-content textarea')[0], {
      lineNumbers: true,
      mode: mode
    });
    
    code_mirror = $('#exports-content .CodeMirror');
    code_mirror[0].CodeMirror.setValue(value);
    
    $('.CodeMirror-scroll').scrollTop(2);
    
  } else {
    code_mirror[0].CodeMirror.setOption('mode', mode);
    code_mirror[0].CodeMirror.setValue(value);
  }
  
  $('#exports-content form .button').attr('href', 'exports/export/save?export=' + opts.export);
};