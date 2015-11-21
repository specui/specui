autocode.action.editExportType = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      type: autocode.project.exports[autocode.data.current.export].type.substr(0, 1).toUpperCase()
        + autocode.project.exports[autocode.data.current.export].type.substr(1)
    },
    formula: 'formulas/forms/Type.json',
    xhr: true,
    ready: function(form) {
      form.fields.type.autocomplete = false;
      form.fields.type.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.type.keydown = function() {
        if (event.keyCode == 13) {
          $('#fuzzy a').first().click();
        }
      };
      form.fields.type.keyup = function() {
        var rows = [], type_name, types = autocode.data.exportTypes;
        for (var i in types) {
          type_name = types[i];
          if (type_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'addExportName',
                data: { name: autocode.string.capitalize(type_name) }
              },
              icon: type_name.toLowerCase() + '-icon black',
              text: autocode.string.capitalize(type_name)
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="type"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Edit Export Type',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (autocode.data.exportTypes.indexOf(data.type.toLowerCase()) === -1) {
        autocode.popup.error('Unknown type: ' + data.type);
        return;
      }
      
      autocode.project.exports[autocode.data.current.export].type = data.type.toLowerCase();
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};