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
  
  var property, property_html, property_name, property_title, property_variable;
  for (var property_name in autocode.object.sort(schema.properties)) {
    property = schema.properties[property_name];
    
    if (property.title) {
      property_title = property.title;
    } else {
      property_title = property_name;
    }
    
    property_hint = autocode.string.escape(
      property.description + (property.default || property.default === false ? '<div style="font-weight: bold">Default: ' + property.default + '</div>' : '')
    );
    
    property_html = '<div class="field">'
      + '<label>'
        + '<span class="text">' + property_title + '</span> '
        + (property.description ? '<span class="icon info-icon" data-hint="' + property_hint + '"></span>' : '')
      + '</label>';
    if (property.type == 'boolean') {
      property_value = (outputed.spec && (outputed.spec[property_name] || outputed.spec[property_name] === false) ? outputed.spec[property_name] : null);
      property_html += autocode.element.radio.html({
        defaultValue: property.default,
        name: property_name,
        options: {
          true: 'True',
          false: 'False'
        },
        value: property_value
      });
    } else {
      property_value = (outputed.spec && outputed.spec[property_name] ? outputed.spec[property_name] : '');
      if (property_value.substr(0, 1) == '$' && autocode.project[property_value.substr(1)]) {
        property_variable = true;
        property_value = autocode.project[property_value.substr(1)];
      } else {
        property_variable = false;
      }
      property_html += '<input' + (property_variable ? ' class="variable"' : '') + ' name="' + property_name + '" onblur="autocode.state[\'outputs/output/variable/blur\']({ name: \'' + property_name + '\' })" onfocus="autocode.state[\'outputs/output/variable\']({ name: \'' + property_name + '\' })" spellcheck="false"' + (property.default ? ' placeholder="' + property.default + '"' : '') + ' type="text" value="' + property_value + '" />';
    }
    property_html += '</div>';
    
    $('#outputs-content .content-center .schema').append(property_html);
  }
  
  autocode.state['outputs/hide']();
  
  autocode.hint.init();
};