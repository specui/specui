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
  
  var property,
    property_field,
    property_icon,
    property_input,
    property_label,
    property_name,
    property_text,
    property_title,
    property_variable;
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
    
    property_field = $(document.createElement('div'));
    property_field.addClass('field');
    
    property_label = $(document.createElement('label'));
    property_field.append(property_label);
    
    property_text = $(document.createElement('span'));
    property_text.addClass('text');
    property_text.text(property_title);
    property_label.append(property_text);
    
    if (property.description) {
      property_icon = $(document.createElement('span'));
      property_icon.addClass('icon info-icon');
      property_icon.attr('data-hint', property_hint);
      property_label.append(property_icon);
    }
    
    if (property.type == 'boolean') {
      property_value = (outputed.spec && (outputed.spec[property_name] || outputed.spec[property_name] === false) ? outputed.spec[property_name] : null);
      property_input = autocode.element.radio.html({
        defaultValue: property.default,
        event: {
          mouseup: function() {
            console.log($(this).find('input').val());
          }
        },
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
      property_input = autocode.element.input.html({
        autocomplete: false,
        class: property_variable ? 'variable' : null,
        event: {
          blur: autocode.state['outputs/input/blur'],
          focus: autocode.state['outputs/input/focus'],
          keydown: function(e) {
            if (e.keyCode == 27) {
              $(this).blur();
              return;
            }
          }
        },
        name: property_name,
        placeholder: property.default,
        spellcheck: false,
        type: 'text',
        value: property_value
      });
    }
    property_field.append(property_input);
    
    $('#outputs-content .content-center .schema').append(property_field);
  }
  
  autocode.state['outputs/hide']();
  
  autocode.hint.init();
};