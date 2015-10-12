autocode.state['outputs/output'] = function(opts) {
  autocode.output = opts.output;
  
  var outputed = autocode.project.outputs[opts.output];
  var generator = autocode.imports['crystal/' + outputed.generator.split('.')[0]].exports[outputed.generator.split('.')[1]];
  
  autocode.data.current.generator = outputed.generator;
  autocode.data.current.output = opts.output;
  
  $('#outputs-content input[name="filename"]').attr('placeholder', generator.filename);
  $('#outputs-content input[name="filename"]').val(outputed.filename);
  $('#outputs-content input[name="generator"]').val(outputed.generator);
  
  if (outputed.spec) {
    $('#outputs-content textarea').val(jsyaml.safeDump(outputed.spec));
  } else {
    $('#outputs-content textarea').val('');
  }
  
  $('#outputs-content .content-center .schema').empty();
  
  var schema = generator.schema;
  
  if (!schema || !schema.properties) {
    return;
  }
  
  var property, property_html, property_title;
  for (var property_name in autocode.object.sort(schema.properties)) {
    property = schema.properties[property_name];
    
    if (property.title) {
      property_title = property.title;
    } else {
      property_title = property_name;
    }
    
    property_html = '<div class="field">'
      + '<label>'
        + '<span class="text">' + property_title + '</span> '
        + (property.description ? '<span class="icon info-icon" data-hint="' + property.description + '"></span>' : '')
      + '</label>';
    if (property.type == 'boolean') {
      property_html += autocode.element.radio.html({
        name: property_name,
        options: {
          true: 'True',
          false: 'False'
        },
        value: (outputed.spec && (outputed.spec[property_name] || outputed.spec[property_name] === false) ? outputed.spec[property_name] : null)
      });
      if (property.default) {
        property_html += ' <span class="text">(Default: ' + property.default + ')</span>';
      }
    } else {
      property_html += '<input spellcheck="false"' + (property.default ? ' placeholder="' + property.default + '"' : '') + ' type="text" value="' + (outputed.spec && outputed.spec[property_name] ? outputed.spec[property_name] : '') + '" />';
    }
    property_html += '</div>';
    
    $('#outputs-content .content-center .schema').append(property_html);
  }
  
  autocode.state['outputs/hide']();
  
  autocode.hint.init();
};