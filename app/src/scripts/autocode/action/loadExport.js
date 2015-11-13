autocode.action.loadExport = function(opts) {
  opts = opts || {};
  
  autocode.data.current.export = opts.name || autocode.data.current.export;
  
  var export_data = autocode.project.exports[autocode.data.current.export];
  
  $('#exports-content-container .table a').removeClass('selected');
  $('#exports-' + autocode.data.current.export).addClass('selected');
  
  $('#exports-name .value').text(autocode.data.current.export || ' [ Click to Add ]');
  $('#exports-type .value').text(export_data.type.substr(0, 1).toUpperCase() + export_data.type.substr(1) || ' [ Click to Add ]');
  $('#exports-description .value').text(export_data.description || ' [ Click to Add ]');
  $('#exports-engine .value').text(export_data.engine || ' [ Click to Add ]');
  $('#exports-filename .value').text(export_data.filename || ' [ Click to Add ]');
  $('#exports-format .value').text(export_data.format || ' [ Click to Add ]');
  $('#exports-schema .value').text(export_data.schema || ' [ Click to Add ]');
  
  var code_mirror = $('#exports-content .CodeMirror');
  var mode = 'text', value = jsyaml.safeDump(autocode.project);
  switch (export_data.type) {
    case 'engine': {
      value = export_data.engine || "\n";
      break;
    }
    case 'generator': {
      $('#exports-engine').show();
      $('#exports-filename').show();
      $('#exports-format').show();
      $('#exports-schema').show();
      
      mode = export_data.format;
      value = export_data.template || "\n";
      
      break;
    }
    case 'helper': {
      mode = 'javascript';
      value = export_data.helper || "\n";
      break;
    }
    case 'schema': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-schema').hide();
      
      mode = 'yaml';
      value = jsyaml.safeDump(export_data.schema) || "\n";
      
      break;
    }
    case 'script': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-schema').hide();
      
      mode = 'yaml';
      value = jsyaml.safeDump(export_data.script) || "\n";
      
      break;
    }
  }
  
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#exports-content textarea')[0], {
      lineNumbers: true,
      mode: mode
    });
    
    code_mirror = $('#exports-content .CodeMirror')
    code_mirror[0].CodeMirror.setValue("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    code_mirror[0].CodeMirror.setValue(value);
    
    $('.CodeMirror-scroll').scrollTop(2);
    
  } else {
    code_mirror[0].CodeMirror.setValue("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    code_mirror[0].CodeMirror.setValue(value);
  }
  
  code_mirror[0].CodeMirror.setOption('mode', mode);
  
  autocode.hint.init();
  
  autocode.resize.all();
};