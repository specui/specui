autocode.action.loadExport = function(opts) {
  opts = opts || {};
  
  autocode.data.current.export = opts.name || autocode.data.current.export || autocode.object.firstKey(autocode.project.exports);
  
  var export_data = autocode.project.exports[autocode.data.current.export];
  
  $('#exports-content-container .table a').removeClass('selected');
  $('#exports-' + autocode.data.current.export).addClass('selected');
  
  $('#exports-name .value').text(autocode.data.current.export || ' [ Click to Add ]');
  $('#exports-type .value').text(export_data.type.substr(0, 1).toUpperCase() + export_data.type.substr(1) || ' [ Click to Add ]');
  $('#exports-description .value').html(export_data.description ? marked(export_data.description) : ' [ Click to Add ]');
  $('#exports-engine .value').text(export_data.engine || ' [ Click to Add ]');
  var filename = '[ Click to Add ]';
  if (export_data.filename) {
    if (typeof(export_data.filename) == 'object' && export_data.filename.value) {
      filename = export_data.filename.value;
    } else if (typeof(export_data.filename) == 'string') {
      filename = export_data.filename;
    }
  }
  $('#exports-filename .value').text(filename);
  $('#exports-format .value').text(export_data.format || ' [ Click to Add ]');
  $('#exports-schema .value').text(export_data.schema || ' [ Click to Add ]');
  
  $('#exports-helpers').text('');
  
  var current_helper, current_helpers = export_data.helper, helper;
  for (var helper_name in current_helpers) {
    helper = current_helpers[helper_name];
    $('#exports-helpers').append(
      '<div class="value" onclick="autocode.action.editExportHelper({ alias: \'' + helper_name + '\' })">'
        + helper_name
        + '<div style="color: #CCC; font-size: 12px">' + helper + '</div>'
      + '</div>');
  }
  
  var code_mirror = $('#exports-content .CodeMirror');
  var mode = 'text', tabs = [], value = jsyaml.safeDump(autocode.project);
  switch (export_data.type) {
    case 'engine': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['engine'];
      
      mode = 'javascript';
      value = export_data.engine || "\n";
      
      break;
    }
    case 'generator': {
      $('#exports-engine').show();
      $('#exports-filename').show();
      $('#exports-format').show();
      $('#exports-helper').show();
      $('#exports-schema').show();
      
      tabs = ['template'];
      
      mode = export_data.format;
      switch (mode) {
        case 'html': {
          mode = 'htmlmixed';
          break;
        }
      }
      value = export_data.template || "\n";
      
      break;
    }
    case 'helper': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['helper'];
      
      mode = 'javascript';
      value = export_data.helper || "\n";
      
      break;
    }
    case 'processor': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['processor'];
      
      mode = 'javascript';
      value = export_data.processor || "\n";
      
      break;
    }
    case 'schema': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['schema'];
      
      mode = 'yaml';
      value = export_data.schema ? jsyaml.safeDump(export_data.schema) : "\n";
      
      break;
    }
    case 'spec': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['spec'];
      
      mode = 'yaml';
      value = export_data.spec ? jsyaml.safeDump(export_data.spec) : "\n";
      
      break;
    }
    case 'transformer': {
      $('#exports-engine').hide();
      $('#exports-filename').hide();
      $('#exports-format').hide();
      $('#exports-helper').hide();
      $('#exports-schema').hide();
      
      tabs = ['transformer'];
      
      mode = 'javascript';
      value = export_data.transformer || "\n";
      
      break;
    }
  }
  $('#exports-tabs').text('');
  
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs[i];
    $('#exports-tabs').append('<a' + (i == 0 ? ' class="selected"' : '') + ' id="exports-' + tab + '-tab" onclick="autocode.action.exportsTab({ tab: \'' + tab + '\' })">' + tab.substr(0,1).toUpperCase() + tab.substr(1) + '</a>')
  }
  
  if (!code_mirror.length) {
    var editor = CodeMirror.fromTextArea($('#exports-content textarea')[0], {
      lineNumbers: autocode.editor.lineNumbersEnabled(),
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
  code_mirror[0].CodeMirror.setOption('theme', autocode.editor.getTheme());
  
  setTimeout(function() { $('#exports-content .CodeMirror')[0].CodeMirror.refresh() }, 0);
  
  autocode.hint.init();
  
  autocode.resize.all();
};