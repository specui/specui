autocode.action.editExportSchema = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      schema: autocode.project.exports[autocode.data.current.export].schema
    },
    formula: 'formulas/forms/Schema.json',
    xhr: true,
    ready: function(form) {
      form.fields.schema.autocomplete = false;
      form.fields.schema.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.schema.keyup = function() {
        var current_schemas = autocode.current.schemas();
        var schema, schema_icon, schema_style, schemas = [];
        for (var schema_name in current_schemas) {
          schema = current_schemas[schema_name];
          if (schema_name.match(new RegExp(value, 'i'))) {
            if (schema_name.split('.').length > 1) {
              schema_icon = 'https://cdn.rawgit.com/crystal/' + schema_name.split('.')[0] + '/master/.autocode/icon.svg';
              if (!schema_style && schema_style !== false) {
                schema_style = true;
              }
            } else {
              schema_icon = 'project-icon black';
            }
            schemas.push({
              action: {
                name: 'addExportSchema',
                data: { name: schema_name }
              },
              icon: schema_icon,
              style: schema_style ? 'divider' : null,
              text: schema_name
            });
            if (schema_style) {
              schema_style = false;
            }
          }
        }
        
        autocode.fuzzy.open({
          rows: schemas,
          target: $('#popup input[name="schema"]'),
          value: value
        });
      };
        
      autocode.popup.open({
        title: 'Edit Export Schema',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      autocode.project.exports[autocode.data.current.export].schema = data.schema;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};