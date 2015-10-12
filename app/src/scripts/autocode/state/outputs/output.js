autocode.state['outputs/output'] = function(opts) {
  autocode.output = opts.output;
  
  var output = autocode.project.outputs[opts.output];
  var generator = autocode.imports['crystal/' + output.generator.split('.')[0]].exports[output.generator.split('.')[1]];
  
  autocode.data.current.generator = output.generator;
  autocode.data.current.output = opts.output;
  
  $('#outputs-content input[name="filename"]').attr('placeholder', generator.filename);
  $('#outputs-content input[name="filename"]').val(output.filename);
  $('#outputs-content input[name="generator"]').val(output.generator);
  
  if (output.spec) {
    $('#outputs-content textarea').val(jsyaml.safeDump(output.spec));
  } else {
    $('#outputs-content textarea').val('');
  }
  
  $('#outputs-content .content-center .schema').empty();
  
  var schema = generator.schema;
  
  if (!schema || !schema.properties) {
    return;
  }
  
  function deepFind(obj, path) {
    var paths = path.split('.')
      , current = obj
      , i;

    for (i = 0; i < paths.length; ++i) {
      if (!current || current[paths[i]] == undefined) {
        return '';
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  };
  
  function addProperties(properties, parent) {
    var property,
      property_field,
      property_icon,
      property_input,
      property_label,
      property_name,
      property_text,
      property_title,
      property_variable;
    for (var property_name in autocode.object.sort(properties)) {
      property = properties[property_name];
      
      if (property.type == 'object') {
        addProperties(property.properties, property_name);
        continue;
      }
      
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
        property_value = (output.spec && (output.spec[property_name] || output.spec[property_name] === false) ? output.spec[property_name] : null);
        property_input = autocode.element.radio.html({
          defaultValue: property.default,
          name: property_name,
          options: {
            true: 'True',
            false: 'False'
          },
          value: property_value
        });
      } else {
        property_value = deepFind(output.spec, parent ? parent + '.' + property_name : property_name);
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
  };
  
  addProperties(schema.properties);
  
  autocode.state['outputs/hide']();
  
  autocode.hint.init();
};