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
        var schema, schemas = [];
        for (var schema_name in autocode.data.schemas) {
          schema = autocode.data.schemas[schema_name];
          if (schema_name.match(new RegExp(value, 'i'))) {
            schemas.push({
              action: {
                name: 'addExportSchema',
                data: { name: schema_name }
              },
              icon: 'https://cdn.rawgit.com/crystal/' + schema_name.split('.')[0] + '/master/.autocode/icon.svg',
              text: schema_name
            });
          }
        }
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