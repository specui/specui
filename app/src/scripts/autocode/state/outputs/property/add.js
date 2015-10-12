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
              state: 'outputs/add/generator?name=' + property_name,
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
    success: function(data) {
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
        
        $('#welcome').fadeOut(function() {
          $('#app').fadeIn();
        });
      });
    }
  });
};