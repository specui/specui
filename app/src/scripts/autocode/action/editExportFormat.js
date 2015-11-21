autocode.action.editExportFormat = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      format: autocode.project.exports[autocode.data.current.export].format
    },
    formula: 'formulas/forms/Format.json',
    xhr: true,
    ready: function(form) {
      form.fields.format.autocomplete = false;
      form.fields.format.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.format.keydown = function() {
        if (event.keyCode == 13) {
          $('#fuzzy a').first().click();
        }
      };
      form.fields.format.keyup = function() {
        var rows = [], type_name, types = autocode.data.formats;
        for (var i in types) {
          type_name = types[i];
          if (type_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'setExportFormat',
                data: { name: type_name }
              },
              icon: type_name.toLowerCase() + '-icon black',
              text: type_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="format"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Edit Export Format',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (autocode.data.formats.indexOf(data.format.toLowerCase()) === -1) {
        autocode.popup.error('Unknown format: ' + data.format);
        return;
      }
      
      autocode.project.exports[autocode.data.current.export].format = data.format;
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};