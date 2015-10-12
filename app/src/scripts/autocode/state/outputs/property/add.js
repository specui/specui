autocode.state['outputs/property/add'] = function() {
  autocode.loader.open();
  
  new formulator({
    formula: 'formulas/forms/AddProperty.json',
    xhr: true,
    ready: function(form) {
      form.fields.property.autocomplete = false;
      
      form.fields.property.keyup = function() {
        var value = $('#popup input[name="property"]').val();
        
        var property, properties = [];
        for (var property_name in autocode.object.sort(autocode.data.generators[autocode.data.current.generator].schema.properties)) {
          property = autocode.data.generators[autocode.data.current.generator].schema.properties[property_name];
          if (property_name.match(new RegExp(value, 'i'))) {
            properties.push({
              state: 'outputs/property/add/choose?name=' + property_name,
              text: property_name
            });
          }
        }
        autocode.fuzzy.open({
          rows: properties,
          target: $('#popup input[name="property"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Add Property',
        content: form.toString()
      });
    },
    submit: function() {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      // validate name
      if (!autocode.data.generators[autocode.data.current.generator].schema.properties[data.property]) {
        autocode.popup.error('Property does not exist.');
        return false;
      }
      
      // validate value
      if (autocode.data.generators[autocode.data.current.generator].schema.properties[data.property].type == 'boolean' && data.value != 'true' && data.value != 'false') {
        autocode.popup.error('Value must be a boolean.');
        return false;
      } else if (autocode.data.generators[autocode.data.current.generator].schema.properties[data.property].type == 'number' && !data.value.match(/^\d+$/)) {
        autocode.popup.error('Value must be a number.');
        return false;
      }
      
      if (autocode.data.generators[autocode.data.current.generator].schema.properties[data.property].type == 'boolean') {
        if (data.value == 'true') {
          data.value = true;
        } else {
          data.value = false;
        }
      }
      
      if (!autocode.project.outputs[autocode.data.current.output].spec) {
        autocode.project.outputs[autocode.data.current.output].spec = {};
      }
      autocode.project.outputs[autocode.data.current.output].spec[data.property] = data.value;
      
      autocode.popup.close();
      
      autocode.state['outputs/output']({ output: autocode.data.current.output });
      
      return false;
    }
  });
};