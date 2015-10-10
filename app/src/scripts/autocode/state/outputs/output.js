autocode.state['outputs/output'] = function(opts) {
  var outputed = autocode.project.outputs[opts.output];
  var generator = autocode.imports['crystal/' + outputed.generator.split('.')[0]].exports[outputed.generator.split('.')[1]];
  
  $('#outputs-content input[name="filename"]').attr('placeholder', generator.filename);
  $('#outputs-content input[name="filename"]').val(outputed.filename);
  $('#outputs-content input[name="generator"]').val(outputed.generator);
  
  $('#outputs-content textarea').val(jsyaml.safeDump(outputed.spec));
  
  $('#outputs-content .content-center .schema').empty();
  
  var schema = generator.schema;
  
  if (!schema || !schema.properties) {
    return;
  }
  
  var property, property_title;
  for (var property_name in schema.properties) {
    property = schema.properties[property_name];
    
    if (property.title) {
      property_title = property.title;
    } else {
      property_title = property_name;
    }
    
    $('#outputs-content .content-center .schema').append(
      '<label>' + property_title + ' <img height="16" src="images/info.svg" style="vertical-align: middle" title="' + property.description + '" /></label>'
      + '<input spellcheck="false" type="text" value="' + outputed.spec[property_name] + '" />'
    );
  }
};